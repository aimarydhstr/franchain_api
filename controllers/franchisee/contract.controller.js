const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { contract, franchisee, franchisor } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });
      const data = await contract.findAll({ where: { franchiseeId: getFranchisee.id },
        include: [{ model: franchisee }, { model: franchisor }]
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get contract', detail: err.message });
    }
  },
};
