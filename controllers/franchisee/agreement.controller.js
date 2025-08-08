const { agreement, franchisor, franchisee } = require('../../models');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

module.exports = {
  index: async (req, res) => {
    try {
      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });
      const data = await agreement.findAll({ where: { franchiseeId: getFranchisee.id },
        include: [{ model: franchisee }, { model: franchisor }]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get agreement', detail: err.message });
    }
  },
};