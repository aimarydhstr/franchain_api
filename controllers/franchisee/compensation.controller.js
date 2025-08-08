const { compensation, complaint, user, franchisee, transaction, order, product } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });
      const data = await compensation.findAll({
        include: [
          {model: complaint, where: {franchiseeId: getFranchisee.id}, include: [{model: user, as: 'consumer'}]}
        ]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get compensation', detail: err.message });
    }
  },
  list: async (req, res) => {
    try {
      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });
      const data = await complaint.findAll({ where: {franchiseeId: getFranchisee.id}, 
        include: [{model: user, as: 'consumer' }, {model: transaction, include: {model: order, include: {model: product}}}]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get complaints', detail: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const complaintId = req.params.id;
      const { type, amount, description } = req.body;

      const comp = await compensation.create({
        complaintId,
        type,
        amount,
        description,
        status: 'pending'
      });

      res.status(201).json({ message: 'Compensation created', data: comp });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create compensation', detail: err.message });
    }
  }
};