const cron = require('node-cron');
const { Op } = require('sequelize');
const crypto = require('crypto');
const { transaction, franchisor, complaint, audit_score, complaint_rule, compensation, clarification, franchisee, agreement, contract } = require('../models');

// Function to get WIB (Western Indonesian Time)
function getDateWIB() {
  const wibString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  return new Date(wibString);
}

// CRON 1: Auto-complaint for late delivery
cron.schedule('*/3 * * * *', async () => {
  console.log('[CRON] Starting auto LATE complaint process...');

  try {
    const now = getDateWIB();
    const rules = await complaint_rule.findAll({
      where: { violationType: 'late', status: 'active' }
    });

    for (const rule of rules) {
      const franchiseeList = await franchisee.findAll({
        where: { franchisorId: rule.franchisorId }
      });

      const franchiseeIds = franchiseeList.map(f => f.id);

      const lateTransactions = await transaction.findAll({
        where: {
          franchiseeId: { [Op.in]: franchiseeIds },
          status: 'pending',
          timestamp: {
            [Op.lte]: new Date(now - rule.maxDeliveryTime * 60 * 1000)
          }
        },
        include: [{
          model: complaint,
          required: false,
        }]
      });

      for (const tx of lateTransactions) {
        const alreadyComplained = tx.complaints && tx.complaints.length > 0;
        if (alreadyComplained) continue;

        const getAgreement = await agreement.findOne({ where: { franchiseeId: tx.franchiseeId } });

        const newComplaint = await complaint.create({
          consumerId: tx.consumerId,
          franchiseeId: tx.franchiseeId,
          transactionId: tx.id,
          agreementId: getAgreement.id,
          description: 'Automation: Delivery exceeded the maximum time limit.',
          violationType: 'late',
          status: 'resolved',
          penalty: rule.autoCompensationAmount || 0,
          chainTxId: crypto.randomBytes(32).toString('hex'),
          resolvedBy: 'system'
        });

        await compensation.create({
          complaintId: newComplaint.id,
          type: rule.autoCompensationType || 'refund',
          amount: rule.autoCompensationAmount || 0,
          status: 'approved',
          chainTxId: crypto.randomBytes(32).toString('hex'),
          resolvedBy: 'system'
        });

        await transaction.update(
          { status: 'completed', chainTxId: crypto.randomBytes(32).toString('hex') },
          { where: { id: tx.id } }
        );

        console.log(`[AUTO-LATE] Complaint ID ${newComplaint.id} created from TX ${tx.id}`);
      }
    }

    console.log('[CRON] Auto LATE complaint process finished.');
  } catch (err) {
    console.error('[CRON] Failed auto LATE complaint:', err.message);
  }
});

// CRON 2: Auto-escalate complaints not clarified/compensated within 30 days
cron.schedule('0 0 * * *', async () => {
  console.log('[CRON] Starting auto-escalation for complaints older than 30 days...');

  try {
    const thresholdDate = new Date(getDateWIB().getTime() - 30 * 24 * 60 * 60 * 1000);

    const complaints = await complaint.findAll({
      where: {
        status: 'open',
        createdAt: { [Op.lte]: thresholdDate }
      },
      include: [clarification, compensation]
    });

    for (const c of complaints) {
      const hasClarification = !!c.clarification;
      const hasCompensation = !!c.compensation;

      if (!hasClarification && !hasCompensation) {
        await c.update({
          status: 'escalated',
          resolvedBy: 'system'
        });

        console.log(`[AUTO-ESCALATE] Complaint ID ${c.id} escalated automatically.`);
      }
    }

    console.log('[CRON] Auto-escalation process finished.');
  } catch (err) {
    console.error('[CRON] Failed auto-escalation:', err.message);
  }
});

// CRON 3: Weekly Franchisor Reputation Scoring
cron.schedule('0 0 * * 1', async () => {
  console.log('[CRON] Calculating franchisee reputation...');

  try {
    const franchisees = await franchisee.findAll();

    for (const f of franchisees) {
      const totalComplaints = await complaint.count({ where: { franchiseeId: f.id } });
      const escalated = await complaint.count({ where: { franchiseeId: f.id, status: 'escalated' } });
      const resolved = await complaint.count({ where: { franchiseeId: f.id, status: 'resolved' } });
      const compensations = await compensation.count({ where: { complaintId: { [Op.ne]: null }, resolvedBy: 'system' } });
      const clarifications = await clarification.count({ where: { complaintId: { [Op.ne]: null } } });

      const score = Math.max(
        0,
        100 - (escalated * 3 + totalComplaints * 1.5 - resolved * 1 + compensations * 1 + clarifications * 0.5)
      );
      const reputation = score >= 80 ? 'Trusted' : score >= 60 ? 'Compliant' : 'Under Watch';

      await audit_score.create({
        franchiseeId: f.id,
        score,
        calculatedAt: getDateWIB(),
        reputation
      });

      console.log(`✔️ [${f.id}] Score: ${score.toFixed(2)} - ${reputation}`);
    }

    console.log('[CRON] Reputation scoring completed.');
  } catch (err) {
    console.error('[CRON] Error during reputation scoring:', err.message);
  }
});

// CRON 4: Auto-terminate expired contracts
cron.schedule('0 0 * * *', async () => {
  console.log('[CRON] Checking expired contracts...');

  try {
    const now = getDateWIB();

    const expiredContracts = await contract.findAll({
      where: {
        endDate: { [Op.lte]: now },
        status: { [Op.ne]: 'terminated' }
      }
    });

    for (const c of expiredContracts) {
      await c.update({ status: 'terminated' });
      console.log(`[AUTO-CONTRACT] Contract ID ${c.id} marked as terminated.`);
    }

    console.log('[CRON] Expired contract check completed.');
  } catch (err) {
    console.error('[CRON] Failed to update expired contracts:', err.message);
  }
});
