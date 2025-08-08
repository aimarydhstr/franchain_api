const { complaint, transaction, agreement, franchisee, complaint_rule, order, product } = require('../../models');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

module.exports = {
  list: async (req, res) => {
    try {
      const transactions = await transaction.findAll({
        where: { consumerId: req.user.id },
        include: [{ model: franchisee }, { model: order, include: { model: product } }, { model: complaint }]
      });
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: 'Gagal mengambil transaksi', detail: err.message });
    }
  },

  index: async (req, res) => {
    try {
      const data = await complaint.findAll({
        where: { consumerId: req.user.id },
        include: [
          { model: transaction, include: [{ model: franchisee }, { model: order, include: { model: product } }] },
          agreement
        ],
        order: [['createdAt', 'DESC']]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Gagal mengambil daftar komplain', detail: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { transactionId, description, violationType } = req.body;

      const tx = await transaction.findByPk(transactionId);
      if (!tx) return res.status(404).json({ message: 'Transaksi tidak ditemukan' });

      const activeAgreement = await agreement.findOne({
        where: {
          franchiseeId: tx.franchiseeId,
          status: 'approved'
        }
      });

      const complaintRule = await complaint_rule.findOne({
        where: {
          violationType: 'late',
          franchisorId: activeAgreement?.franchisorId,
          status: 'active'
        }
      });

      if (violationType === 'late' && complaintRule) {
        const now = new Date();
        const deliveredAt = new Date(tx.timestamp);
        const timeDiffMs = now - deliveredAt;
        const timeDiffMinutes = Math.floor(timeDiffMs / (1000 * 60));

        if (timeDiffMinutes < complaintRule.maxDeliveryTime) {
          return res.status(400).json({
            message: `Pesanan belum melebihi batas keterlambatan ${complaintRule.maxDeliveryTime} menit`
          });
        }
      }

      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: 'Bukti pelanggaran (evidence) wajib diunggah' });
      }

      const filePath = file.path;
      const fileBuffer = fs.readFileSync(filePath);
      const evidenceHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
      const evidenceFile = `/uploads/evidences/${file.filename}`;

      const newComplaint = await complaint.create({
        consumerId: req.user.id,
        franchiseeId: tx.franchiseeId,
        agreementId: activeAgreement?.id,
        transactionId,
        description,
        violationType,
        evidenceFile,
        evidenceHash,
        status: 'open'
      });

      res.status(201).json({ message: 'Komplain berhasil dikirim', data: newComplaint });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Gagal membuat komplain', detail: err.message });
    }
  }
};
