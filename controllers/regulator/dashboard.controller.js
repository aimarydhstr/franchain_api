const { complaint, compensation, mediation, user } = require('../../models');
const { fn, col, literal } = require('sequelize');

exports.dashboard = async (req, res) => {
  try {
    const totalComplaints = await complaint.count();
    const totalCompensations = await compensation.count();
    const totalMediations = await mediation.count();

    const statusRaw = await complaint.findAll({
      attributes: ['status', [fn('COUNT', '*'), 'count']],
      group: ['status']
    });

    const compensationRaw = await compensation.findAll({
      attributes: [
        [fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'],
        [fn('COUNT', '*'), 'total']
      ],
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    const mediationRaw = await mediation.findAll({
      attributes: [
        [fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'],
        [fn('COUNT', '*'), 'total']
      ],
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    const complaintStatusStats = statusRaw.map(item => ({
      name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      value: parseInt(item.get('count'))
    }));

    const compensationStats = compensationRaw.map(item => ({
      month: item.get('month'),
      total: parseInt(item.get('total'))
    }));

    const mediationStats = mediationRaw.map(item => ({
      month: item.get('month'),
      total: parseInt(item.get('total'))
    }));

    res.json({
      totalComplaints,
      totalCompensations,
      totalMediations,
      complaintStatusStats,
      compensationStats,
      mediationStats
    });
  } catch (err) {
    console.error('Dashboard Regulator Error:', err);
    res.status(500).json({ message: 'Failed to fetch regulator dashboard data' });
  }
};
