const { mediation, complaint, user, franchisee } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });
      const data = await mediation.findAll({
        include: [
          { model: complaint, where: { franchiseeId: getFranchisee.id }, include: [{ model: user, as: 'consumer' }, { model: franchisee }] },
          { model: user, as: 'mediator', attributes: ['id', 'name', 'email'] }
        ]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get mediations', detail: err.message });
    }
  },
};
