const { Op, fn, col, literal } = require('sequelize');
const { transaction, complaint, compensation } = require('../../models');
const moment = require('moment');

exports.dashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalTransactions = await transaction.count({ where: { consumerId: userId } });
    const totalComplaints = await complaint.count({ where: { consumerId: userId } });
    const totalCompensations = await compensation.count({
      include: {
        model: complaint,
        where: { consumerId: userId },
        required: true
      }
    });

    const sixMonthsAgo = moment().subtract(5, 'months').startOf('month').toDate();

    const complaintsRaw = await complaint.findAll({
      attributes: [
        [fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'],
        [fn('COUNT', '*'), 'total']
      ],
      where: {
        consumerId: userId,
        createdAt: { [Op.gte]: sixMonthsAgo }
      },
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    const transactionsRaw = await transaction.findAll({
      attributes: [
        [fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'],
        [fn('COUNT', '*'), 'total']
      ],
      where: {
        consumerId: userId,
        createdAt: { [Op.gte]: sixMonthsAgo }
      },
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

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
        '$complaint.consumerId$': userId,
        'createdAt': { [Op.gte]: sixMonthsAgo }
      },
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });


    const formatMonthlyData = (raw) => raw.map(row => ({
      month: moment(row.get('month')).format('MMM YYYY'),
      total: parseInt(row.get('total'))
    }));

    res.json({
      totalTransactions,
      totalComplaints,
      totalCompensations,
      complaintsPerMonth: formatMonthlyData(complaintsRaw),
      transactionsPerMonth: formatMonthlyData(transactionsRaw),
      compensationsPerMonth: formatMonthlyData(compensationsRaw)
    });
  } catch (err) {
    console.error('Dashboard Error:', err);
    res.status(500).json({ message: 'Gagal mengambil data dashboard' });
  }
};
