const { compensation, complaint, user, franchisee, transaction, mediation, order, product } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await compensation.findAll({
        include: [
          {model: complaint, where: {[Op.or]: [
          { status: 'escalated' },
          { status: 'resolved', resolvedBy: 'mediator' }
        ] }, include: [{model: user, as: 'consumer'}, {model: franchisee}, {model: transaction, include: {model: order, include: {model: product}}}, {model: mediation, required: true, where: { status: 'completed' }}]},
        ]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil data kompensasi', detail: err.message });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Status tidak valid' });
      }

      const data = await compensation.findByPk(id);
      if (!data) return res.status(404).json({ error: 'Kompensasi tidak ditemukan' });

      await data.update({
        status,
        resolvedBy: 'mediator'
      });
      
      const relatedComplaint = await complaint.findByPk(data.complaintId);

      if (status === 'approved') {
        await relatedComplaint.update({
          penalty: data.amount,
          status: 'resolved',
          resolvedBy: 'mediator'
        });
      } else {
        await relatedComplaint.update({
          penalty: data.amount,
          status: 'escalated',
          resolvedBy: 'mediator'
        });
      }

      res.json({ message: 'Status kompensasi diperbarui', data });
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengubah status', detail: err.message });
    }
  }
};