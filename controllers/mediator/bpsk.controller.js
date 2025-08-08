const { bpsk } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await bpsk.findAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil data BPSK', detail: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name, city, address } = req.body;
      if (!name || !city || !address) return res.status(400).json({ error: 'Field wajib diisi' });
      const data = await bpsk.create({ name, city, address });
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal membuat BPSK', detail: err.message });
    }
  }
};