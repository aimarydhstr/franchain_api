const { compensation, complaint, franchisee } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await compensation.findAll({
        include: [
          {model: complaint, where: {consumerId: req.user.id}, include: [{model: franchisee}]}
        ]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil data refund', detail: err.message });
    }
  }
};