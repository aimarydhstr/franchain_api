const { compensation, complaint, user, franchisee, franchisor } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const getFranchisor = await franchisor.findOne({ where: { userId: req.user.id } });
      const data = await compensation.findAll({
        include: [
          {model: complaint, include: [{model: user, as: 'consumer'}, {model: franchisee, where: {franchisorId: getFranchisor.id}}]}
        ]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get compensation', detail: err.message });
    }
  },
}