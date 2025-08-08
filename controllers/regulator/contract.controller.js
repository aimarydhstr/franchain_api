const { contract, franchisor, franchisee } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await contract.findAll({ include: [franchisor, franchisee] });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil contract', detail: err.message });
    }
  },

  approve: async (req, res) => {
    try {
      const data = await contract.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'Kontrak tidak ditemukan' });
      await data.update({ status: 'active' });
      res.json({ message: 'Kontrak disetujui', data });
    } catch (err) {
      res.status(500).json({ error: 'Gagal menyetujui kontrak', detail: err.message });
    }
  },

  reject: async (req, res) => {
    try {
      const data = await contract.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'Kontrak tidak ditemukan' });
      await data.update({ status: 'terminated' });
      res.json({ message: 'Kontrak ditolak', data });
    } catch (err) {
      res.status(500).json({ error: 'Gagal menolak kontrak', detail: err.message });
    }
  }
};