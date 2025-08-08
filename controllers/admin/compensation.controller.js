const { compensation, complaint, user, franchisee, franchisor } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await compensation.findAll({
        include: [
          {model: complaint, include: [{model: user, as: 'consumer'}, {model: franchisee}]}
        ]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get compensation', detail: err.message });
    }
  },
}