const { transaction, complaint, refund } = require('../../models');

module.exports = {
  realTimeStats: async (req, res) => {
    try {
      const totalTrans = await transaction.count();
      const openComplaints = await complaint.count({ where: { status: 'open' } });
      const refundPending = await refund.count({ where: { status: 'requested' } });

      res.json({
        totalTransactions: totalTrans,
        complaintsOpen: openComplaints,
        refundPending
      });
    } catch (err) {
      res.status(500).json({ error: 'Gagal memuat data monitoring', detail: err.message });
    }
  }
};