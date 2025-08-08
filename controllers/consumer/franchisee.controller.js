const { 
  franchisee, 
  user, 
  transaction, 
  complaint, 
  compensation, 
  audit_score, 
  agreement,
  franchisor,
} = require('../../models');
const { Op, fn, col, literal } = require('sequelize');
const moment = require('moment');

module.exports = {
  index: async (req, res) => {
    try {
      const allFranchisees = await franchisee.findAll({
        include: [
          {
            model: franchisor
          },
          {
            model: user,
            attributes: ['name', 'email', 'status']
          },
        ]
      });
      return res.status(200).json(allFranchisees);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  view: async (req, res) => {
    try {
      const { id } = req.params;

      const fr = await franchisee.findOne({
        where: { id },
        include: [{ model: user, attributes: ['name', 'email', 'status'] }, { model: franchisor }]
      });

      if (!fr) return res.status(404).json({ error: 'Franchisee tidak ditemukan' });

      // Ambil semua transaksi milik franchisee tersebut
      const totalTransactions = await transaction.count({
        where: { franchiseeId: fr.id }
      });
  
      const totalComplaints = await complaint.count({
        where: { franchiseeId: fr.id }
      });
  
      const totalCompensations = await compensation.count({
        include: [{
          model: complaint,
          required: true,
          where: { franchiseeId: fr.id }
        }]
      });
  
      const sixMonthsAgo = moment().subtract(5, 'months').startOf('month').toDate();
  
      const complaintsRaw = await complaint.findAll({
        attributes: [
          [fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'],
          [fn('COUNT', '*'), 'total']
        ],
        where: {
          franchiseeId: fr.id,
          createdAt: { [Op.gte]: sixMonthsAgo }
        },
        group: [literal('month')],
        order: [[literal('month'), 'ASC']]
      });
  
      const complaintsPerMonth = complaintsRaw.map(row => ({
        month: moment(row.get('month')).format('MMM YYYY'),
        total: parseInt(row.get('total'))
      }));
  
      const transactionsRaw = await transaction.findAll({
        attributes: [
          [fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'],
          [fn('COUNT', '*'), 'total']
        ],
        where: {
          franchiseeId: fr.id,
          createdAt: { [Op.gte]: sixMonthsAgo }
        },
        group: [literal('month')],
        order: [[literal('month'), 'ASC']]
      });
  
      const transactionsPerMonth = transactionsRaw.map(row => ({
        month: moment(row.get('month')).format('MMM YYYY'),
        total: parseInt(row.get('total'))
      }));
  
      const compensationsRaw = await compensation.findAll({
        attributes: [
          [fn('DATE_FORMAT', col('compensation.createdAt'), '%Y-%m'), 'month'],
          [fn('COUNT', '*'), 'total']
        ],
        include: [{
          model: complaint,
          attributes: []
        }],
        where: {
          '$complaint.franchiseeId$': fr.id,
          'createdAt': { [Op.gte]: sixMonthsAgo }
        },
        group: [literal('month')],
        order: [[literal('month'), 'ASC']]
      });
  
      const compensationsPerMonth = compensationsRaw.map(row => ({
        month: moment(row.get('month')).format('MMM YYYY'),
        total: parseInt(row.get('total'))
      }));

      const auditScore = await audit_score.findOne({
        where: { franchiseeId: id },
        order: [['calculatedAt', 'DESC']]
      });

      const agreements = await agreement.findOne({
        where: { franchiseeId: id },
        attributes: ['fileUrl', 'title']
      });

      res.json({
        id: fr.id,
        outletName: fr.outletName,
        user: fr.user,
        franchisor: fr.franchisor,
        agreement: agreements || null,
        auditScore,
        dashboard: {
          totalTransactions,
          totalComplaints,
          totalCompensations,
          complaintsPerMonth,
          transactionsPerMonth,
          compensationsPerMonth
        }
      });
    } catch (err) {
      console.error('Franchisee View Error:', err);
      res.status(500).json({ error: 'Gagal mengambil data franchisee', detail: err.message });
    }
  }
};
