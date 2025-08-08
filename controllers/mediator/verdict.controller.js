const { mediation } = require('../../models');

module.exports = {
  uploadVerdict: async (req, res) => {
    try {
      const { id } = req.params;
      const { verdictFile } = req.body;
      if (!verdictFile) return res.status(400).json({ error: 'File wajib diisi' });

      const data = await mediation.findByPk(id);
      if (!data) return res.status(404).json({ error: 'Mediasi tidak ditemukan' });

      await data.update({ verdictFile });
      res.json({ message: 'File putusan berhasil diunggah', data });
    } catch (err) {
      res.status(500).json({ error: 'Gagal upload file putusan', detail: err.message });
    }
  }
};