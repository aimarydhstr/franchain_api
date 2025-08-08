const { complaint, clarification, transaction, user, order, product, franchisor, franchisee } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const getFranchisor = await franchisor.findOne({ where: { userId: req.user.id } });
      const data = await complaint.findAll({
        include: [
          { model: user, as: 'consumer', attributes: ['id', 'name', 'email'] },
          { model: transaction, include: [{ model: order, include: { model: product } }] },
          { model: clarification, required: false },
          { model: franchisee, where: { franchisorId: getFranchisor.id }, attributes: ['outletName'] }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil komplain', detail: err.message });
    }
  },
};
