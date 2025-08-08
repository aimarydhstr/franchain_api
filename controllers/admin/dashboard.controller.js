const { user, complaint, compensation, mediation, transaction, Sequelize } = require('../../models');
const { fn, col, literal, where, Op } = Sequelize;

exports.dashboard = async (req, res) => {
  try {
    const roles = ['franchisor', 'franchisee', 'consumer', 'regulator'];
    const users = {};

    for (const role of roles) {
      users[role] = await user.count({ where: { role } });
    }

    const userStatus = {
      active: await user.count({ where: { status: 'aktif' } }),
      pending: await user.count({ where: { status: 'pending' } }),
      inactive: await user.count({ where: { status: 'tidak aktif' } }),
    };

    const totalComplaints = await complaint.count();
    const totalCompensations = await compensation.count();
    const totalMediations = await mediation.count();
    const totalTransactions = await transaction.count();

    const complaintsPerMonth = await complaint.findAll({
      attributes: [[fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'], [fn('COUNT', '*'), 'total']],
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    const compensationsPerMonth = await compensation.findAll({
      attributes: [[fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'], [fn('COUNT', '*'), 'total']],
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    const transactionsPerMonth = await transaction.findAll({
      attributes: [[fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'], [fn('COUNT', '*'), 'total']],
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    res.json({
      users,
      userStatus,
      totalComplaints,
      totalCompensations,
      totalMediations,
      totalTransactions,
      complaintsPerMonth: complaintsPerMonth.map(row => ({ month: row.get('month'), total: +row.get('total') })),
      compensationsPerMonth: compensationsPerMonth.map(row => ({ month: row.get('month'), total: +row.get('total') })),
      transactionsPerMonth: transactionsPerMonth.map(row => ({ month: row.get('month'), total: +row.get('total') })),
    });
  } catch (err) {
    console.error('Dashboard Admin Error:', err);
    res.status(500).json({ message: 'Gagal mengambil data dashboard admin' });
  }
};
