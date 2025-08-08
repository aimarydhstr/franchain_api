const { mediation, complaint, user, franchisee } = require('../../models');

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
};
