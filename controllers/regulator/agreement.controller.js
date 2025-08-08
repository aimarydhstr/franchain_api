const { agreement, franchisor, franchisee } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await agreement.findAll({ include: [franchisor, franchisee] });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil agreement', detail: err.message });
    }
  },

  approve: async (req, res) => {
    try {
      const data = await agreement.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'Agreement tidak ditemukan' });
      await data.update({ status: 'approved' });
      res.json({ message: 'Agreement disetujui', data });
    } catch (err) {
      res.status(500).json({ error: 'Gagal menyetujui agreement', detail: err.message });
    }
  },

  reject: async (req, res) => {
    try {
      const data = await agreement.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'Agreement tidak ditemukan' });
      await data.update({ status: 'rejected' });
      res.json({ message: 'Agreement ditolak', data });
    } catch (err) {
      res.status(500).json({ error: 'Gagal menolak agreement', detail: err.message });
    }
  }
};