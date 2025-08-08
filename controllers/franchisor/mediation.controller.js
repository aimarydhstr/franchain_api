const { mediation, complaint, user, franchisee, franchisor } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const getFranchisor = await franchisor.findOne({ where: { userId: req.user.id } });
      const data = await mediation.findAll({
        include: [
          { model: complaint, include: [{ model: user, as: 'consumer' }, { model: franchisee, where: { franchisorId: getFranchisor.id } }] },
          { model: user, as: 'mediator', attributes: ['id', 'name', 'email'] }
        ]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get mediations', detail: err.message });
    }
  },
};
