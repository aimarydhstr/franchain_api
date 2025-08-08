const { complaint, mediation, compensation, Sequelize } = require('../../models');
const { fn, col, literal, Op } = Sequelize;

exports.dashboard = async (req, res) => {
  try {
    const totalHandledComplaints = await complaint.count({
      where: { resolvedBy: 'mediator' }
    });

    const totalMediations = await mediation.count();
    const completedMediations = await mediation.count({
      where: { status: 'completed' }
    });

    // Mediation per month
    const monthlyMediations = await mediation.findAll({
      attributes: [
        [fn('DATE_FORMAT', col('schedule'), '%Y-%m'), 'month'],
        [fn('COUNT', '*'), 'total']
      ],
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    const mediationsPerMonth = monthlyMediations.map(row => ({
      month: row.get('month'),
      total: parseInt(row.get('total'))
    }));

    // Handled Complaints per Month
    const complaintsPerMonth = await complaint.findAll({
      attributes: [
        [fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'],
        [fn('COUNT', '*'), 'total']
      ],
      where: { resolvedBy: 'mediator' },
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    // Handled Compensations per Month
    const compensationsPerMonth = await compensation.findAll({
      attributes: [
        [fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'],
        [fn('COUNT', '*'), 'total']
      ],
      where: { resolvedBy: 'mediator' },
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    // Mediations this month (pie)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const mediations = await mediation.findAll({
      attributes: ['status', [fn('COUNT', '*'), 'total']],
      group: ['status']
    });

    const mediationPie = mediations.map(row => ({
      name: row.get('status'),
      value: parseInt(row.get('total'))
    }));

    res.json({
      totalHandledComplaints,
      totalMediations,
      completedMediations,
      mediationsPerMonth,
      complaintsPerMonth: complaintsPerMonth.map(r => ({
        month: r.get('month'),
        total: parseInt(r.get('total'))
      })),
      compensationsPerMonth: compensationsPerMonth.map(r => ({
        month: r.get('month'),
        total: parseInt(r.get('total'))
      })),
      mediationPie
    });
  } catch (err) {
    console.error('Dashboard Mediator Error:', err);
    res.status(500).json({ message: 'Failed to fetch mediator dashboard data' });
  }
};
