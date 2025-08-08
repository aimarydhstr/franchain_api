const crypto = require('crypto');
const { transaction, franchisee, user, product, order } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });

      if (!getFranchisee) {
        return res.status(404).json({ error: 'Franchisee not found for the user' });
      }

      const transactions = await transaction.findAll({
        where: { franchiseeId: getFranchisee.id },
        include: [
          {
            model: order,
            include: [
              {
                model: product,
                attributes: ['id', 'name', 'price']
              }
            ]
          },
          {
            model: user,
            as: 'consumer',
            attributes: ['id', 'name', 'email']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      const products = await product.findAll({ attributes: ['id', 'name', 'price'] });
      const consumers = await user.findAll({
        where: { role: 'consumer' },
        attributes: ['id', 'name', 'email']
      });

      res.json({ transactions, products, consumers });

    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch transactions', detail: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { consumerId, items } = req.body;

      if (!consumerId || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Consumer and at least one item are required' });
      }

      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });

      if (!getFranchisee) {
        return res.status(404).json({ error: 'Franchisee not found for the user' });
      }

      const createdTransaction = await transaction.create({
        consumerId,
        franchiseeId: getFranchisee.id,
        timestamp: new Date(),
        status: 'pending',
      });

      let totalTransaction = 0;

      for (const item of items) {
        const foundProduct = await product.findByPk(item.productId);
        if (!foundProduct) continue;

        const subtotal = foundProduct.price * item.qty;
        totalTransaction += subtotal;

        await order.create({
          transactionId: createdTransaction.id,
          consumerId: consumerId,
          productId: foundProduct.id,
          qty: item.qty
        });
      }

      await createdTransaction.update({ total: totalTransaction });

      res.status(201).json({ transaction: createdTransaction });

    } catch (err) {
      res.status(500).json({ error: 'Failed to create transaction', detail: err.message });
    }
  },

  cancel: async (req, res) => {
    try {
      const { id } = req.params;

      const tx = await transaction.findByPk(id);
      if (!tx) return res.status(404).json({ error: 'Transaction not found' });

      if (tx.status !== 'pending') {
        return res.status(400).json({ error: 'Only pending transactions can be cancelled' });
      }

      tx.status = 'cancelled';
      tx.chainTxId = crypto.randomBytes(32).toString('hex');
      await tx.save();

      res.json({ message: 'Transaction cancelled', transaction: tx });
    } catch (err) {
      res.status(500).json({ error: 'Failed to cancel transaction', detail: err.message });
    }
  },

  complete: async (req, res) => {
    try {
      const { id } = req.params;

      const tx = await transaction.findByPk(id);
      if (!tx) return res.status(404).json({ error: 'Transaction not found' });

      if (tx.status !== 'pending') {
        return res.status(400).json({ error: 'Only pending transactions can be completed' });
      }

      tx.status = 'completed';
      tx.chainTxId = crypto.randomBytes(32).toString('hex');
      await tx.save();

      res.json({ message: 'Transaction completed', transaction: tx });
    } catch (err) {
      res.status(500).json({ error: 'Failed to complete transaction', detail: err.message });
    }
  }
};
