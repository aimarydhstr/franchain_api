const { audit, franchisee, complaint } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await audit.findAll({
        include: [franchisee, complaint]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil data audit', detail: err.message });
    }
  }
};