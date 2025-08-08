const { transaction, franchisor, franchisee, order, product, user } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await transaction.findAll({
        include: [
          {model: franchisee}, {model: order, include: {model: product}}, {model: user, as: 'consumer'}
        ]
      });
      const franchisees = await franchisee.findAll();
      res.json({ transactions: data, franchisees: franchisees });

    } catch (err) {
      res.status(500).json({ error: 'Transaction not found', detail: err.message });
    }
  },
};