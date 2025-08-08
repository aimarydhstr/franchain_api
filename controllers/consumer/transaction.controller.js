const { transaction, franchisee, user, order, product } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await transaction.findAll({
        where: {
          consumerId: req.user.id
        },
        include: [
          {model: franchisee}, {model: order, include: {model: product}}
        ]
      });
      const franchisees = await franchisee.findAll();
      res.json({ transactions: data, franchisees: franchisees });

    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil transaksi', detail: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { franchiseeId, productName, amount, price } = req.body;
      const getConsumer = await user.findOne({ where: { userId: req.user.id } });
      
      if (!franchiseeId || !productName || !price || !amount) return res.status(400).json({ error: 'Field wajib diisi' });

      const total = parseInt(price) * parseInt(amount);
      const data = await transaction.create({ franchiseeId, userId:getConsumer.id, productName, amount, price, total });
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal membuat transaksi', detail: err.message });
    }
  }
};