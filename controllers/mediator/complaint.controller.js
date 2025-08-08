const { complaint, user, transaction, clarification, franchisee, compensation, mediation, order, product } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await complaint.findAll({ where: {
        [Op.or]: [
          { status: 'escalated' },
          { status: 'resolved', resolvedBy: 'mediator' }
        ] },
        include: [
          { model: user, as: 'consumer', attributes: ['id', 'name', 'email'] },
          { model: transaction, include: [{ model: order, include: { model: product } }] },
          { model: clarification },
          { model: compensation },
          { model: franchisee },
          { model: mediation, required: true, where: { status: 'completed' } }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil data komplain', detail: err.message });
    }
  },

  verifyComplaint: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, penalty, compensationType, compensationAmount, compensationDescription } = req.body;

      if (!['resolved', 'escalated'].includes(status)) {
        return res.status(400).json({ error: 'Status tidak valid' });
      }

      const target = await complaint.findByPk(id);
      if (!target) return res.status(404).json({ error: 'Komplain tidak ditemukan' });

      await target.update({
        status,
        penalty: status === 'resolved' ? penalty || 0 : target.penalty,
        resolvedBy: 'mediator'
      });

      if (status === 'resolved') {
        const existing = await compensation.findOne({ where: { complaintId: id } });
        if (existing) {
          await existing.update({
            type: compensationType || existing.type,
            amount: compensationAmount || existing.amount,
            description: compensationDescription || existing.description,
            status: 'approved',
            resolvedBy: 'mediator'
          });
        } else if (compensationType && compensationAmount) {
          await compensation.create({
            complaintId: id,
            type: compensationType,
            amount: compensationAmount,
            description: compensationDescription || '',
            status: 'approved',
            resolvedBy: 'mediator'
          });
        }
      }

      res.json({ message: 'Komplain berhasil diverifikasi', data: target });
    } catch (err) {
      res.status(500).json({ error: 'Gagal verifikasi komplain', detail: err.message });
    }
  }
};