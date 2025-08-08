module.exports = {
  getSettings: async (req, res) => {
    try {
      res.json({ system: 'FranChain', version: '1.0.0', status: 'running' });
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil pengaturan', detail: err.message });
    }
  }
};