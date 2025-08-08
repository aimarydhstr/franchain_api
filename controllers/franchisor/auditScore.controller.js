const { audit_score, franchisee, franchisor } = require('../../models');

exports.index = async (req, res) => {
  try {
    const getFranchisor = await franchisor.findOne({ where: { userId: req.user.id } });
    const data = await audit_score.findAll({
      include: [{ model: franchisee, where: { franchisorId: getFranchisor.id }, attributes: ['id', 'outletName'] }],
      order: [['calculatedAt', 'DESC']]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data reputasi', detail: err.message });
  }
};
