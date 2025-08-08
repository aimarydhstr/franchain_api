const { agreement, franchisor, user } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await franchisor.findAll({
        include: [
          {
            model: user,
            attributes: ['id', 'name', 'email']
          }
        ]
      });
      
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil franchisor', detail: err.message });
    }
  },

  approve: async (req, res) => {
    try {
      const data = await franchisor.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'Franchisor tidak ditemukan' });
      await data.update({ verified: 'terverifikasi' });
      res.json({ message: 'Franchisor disetujui', data });
    } catch (err) {
      res.status(500).json({ error: 'Gagal menyetujui franchisor', detail: err.message });
    }
  },

  reject: async (req, res) => {
    try {
      const data = await franchisor.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'Franchisor tidak ditemukan' });
      await data.update({ verified: 'tidak terverifikasi' });
      res.json({ message: 'Franchisor ditolak', data });
    } catch (err) {
      res.status(500).json({ error: 'Gagal menolak franchisor', detail: err.message });
    }
  }
};