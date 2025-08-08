// controllers/dashboardController.js
const { transaction, complaint, compensation, franchisee } = require('../../models');
const { Op, fn, col, literal } = require('sequelize');
const moment = require('moment');

exports.dashboard = async (req, res) => {
  try {
    const getFranchisee = await franchisee.findOne({where:{userId: req.user.id}});

    // Ambil semua transaksi milik franchisee tersebut
    const totalTransactions = await transaction.count({
      where: { franchiseeId: getFranchisee.id }
    });

    const totalComplaints = await complaint.count({
      where: { franchiseeId: getFranchisee.id }
    });

    const totalCompensations = await compensation.count({
      include: [{
        model: complaint,
        required: true,
        where: { franchiseeId: getFranchisee.id }
      }]
    });

    const sixMonthsAgo = moment().subtract(5, 'months').startOf('month').toDate();

    const complaintsRaw = await complaint.findAll({
      attributes: [
        [fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'],
        [fn('COUNT', '*'), 'total']
      ],
      where: {
        franchiseeId: getFranchisee.id,
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
        franchiseeId: getFranchisee.id,
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
        '$complaint.franchiseeId$': getFranchisee.id,
        'createdAt': { [Op.gte]: sixMonthsAgo }
      },
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    const compensationsPerMonth = compensationsRaw.map(row => ({
      month: moment(row.get('month')).format('MMM YYYY'),
      total: parseInt(row.get('total'))
    }));

    res.json({
      totalTransactions,
      totalComplaints,
      totalCompensations,
      complaintsPerMonth,
      transactionsPerMonth,
      compensationsPerMonth
    });
  } catch (err) {
    console.error('Dashboard Franchisee Error:', err);
    res.status(500).json({ message: 'Gagal mengambil data dashboard franchisee' });
  }
};
