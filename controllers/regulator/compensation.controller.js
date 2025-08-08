const { compensation, complaint, user, franchisee, transaction, order, product } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await compensation.findAll({
        include: [
          {model: complaint, include: [{model: user, as: 'consumer'}, {model: franchisee}, {model: transaction, include: {model: order, include: {model: product}}}]},
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
        resolvedBy: 'regulator'
      });
      
      const relatedComplaint = await complaint.findByPk(data.complaintId);

      if (status === 'approved') {
        await relatedComplaint.update({
          penalty: data.amount,
          status: 'resolved',
          resolvedBy: 'regulator'
        });
      } else {
        await relatedComplaint.update({
          penalty: data.amount,
          status: 'escalated',
          resolvedBy: 'regulator'
        });
      }

      res.json({ message: 'Status kompensasi diperbarui', data });
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengubah status', detail: err.message });
    }
  }
};