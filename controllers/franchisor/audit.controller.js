const { audit, complaint, franchisee } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await audit.findAll({ include: [complaint, franchisee] });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil data audit', detail: err.message });
    }
  }
};