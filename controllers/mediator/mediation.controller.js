const fs = require('fs');
const crypto = require('crypto');
const { mediation, complaint, user, franchisee, transaction, clarification, compensation } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await mediation.findAll({
        include: [
          { model: complaint, include: [{ model: user, as: 'consumer' }, { model: franchisee }] },
          { model: user, as: 'mediator', attributes: ['id', 'name', 'email'] }
        ]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get mediations', detail: err.message });
    }
  },

  list: async (req, res) => {
    try {
      const data = await complaint.findAll({
        where: {
          status: 'escalated',
          resolvedBy: null
        },
        include: [
          { model: user, as: 'consumer' },
          { model: transaction },
          { model: clarification },
          { model: compensation },
          { model: mediation}
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get complaints', detail: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { complaintId, schedule, location } = req.body;
      if (!complaintId || !schedule || !location) {
        return res.status(400).json({ error: 'Field must be filled' });
      }

      const newMediation = await mediation.create({
        complaintId,
        mediatorId: req.user.id,
        schedule,
        location,
        status: 'scheduled'
      });

      res.status(201).json({ message: 'Mediation successfully scheduled', data: newMediation });
    } catch (err) {
      res.status(500).json({ error: 'Failed to schedule mediation', detail: err.message });
    }
  },

  complete: async (req, res) => {
    try {
      const { id } = req.params;
      const { result } = req.body;
      const file = req.file;

      if (!result || !file) {
        return res.status(400).json({ error: 'Field must be filled' });
      }

      const med = await mediation.findByPk(id);
      if (!med) return res.status(404).json({ error: 'Mediation not found' });

      const fileBuffer = fs.readFileSync(file.path);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      const updated = await med.update({
        result,
        verdictFile: `/uploads/verdicts/${file.filename}`,
        verdictHash: hash,
        status: 'completed'
      });

      res.json({ message: 'Mediation successfully completed', data: updated });
    } catch (err) {
      res.status(500).json({ error: 'Failed to complete mediation', detail: err.message });
    }
  },

  reject: async (req, res) => {
    try {
      const { id } = req.params;

      const med = await mediation.findByPk(id);
      if (!med) return res.status(404).json({ error: 'Mediation not found' });

      await med.update({ status: 'rejected' });

      res.json({ message: 'Mediation successfully rejected' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to reject mediation', detail: err.message });
    }
  }
};
