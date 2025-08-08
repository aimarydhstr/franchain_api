const { audit_score, franchisee, franchisor } = require('../../models');

exports.index = async (req, res) => {
  try {
    const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });
    const data = await audit_score.findAll({
      where: { franchiseeId: getFranchisee.id },
      include: [{ model: franchisee, attributes: ['id', 'outletName'] }],
      order: [['calculatedAt', 'DESC']]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data reputasi', detail: err.message });
  }
};
