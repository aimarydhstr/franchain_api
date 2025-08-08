module.exports = {
  dailyReport: async (req, res) => {
    try {
      // placeholder
      res.json({
        date: new Date().toISOString().split('T')[0],
        totalTransactions: 18,
        totalRevenue: 740000,
        note: 'Laporan outlet otomatis'
      });
    } catch (err) {
      res.status(500).json({ error: 'Gagal memuat laporan harian', detail: err.message });
    }
  }
};