const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { contract, franchisor, franchisee } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const getFranchisor = await franchisor.findOne({ where: { userId: req.user.id } });
      const data = await contract.findAll({ where: { franchisorId: getFranchisor.id },
        include: [{ model: franchisor }, { model: franchisee }]
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get contract', detail: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { franchiseeId, title, description, endDate } = req.body;

      const getFranchisor = await franchisor.findOne({ where: { userId: req.user.id } });

      if (!franchiseeId || !title || !description || !endDate) {
        return res.status(400).json({ error: 'Field must be filled' });
      }

      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'Contract file must be uploaded' });
      }
      
      const endDates = endDate
        ? new Date(`${endDate}T23:59:59`)
        : null;

      if (endDates < new Date()) {
        return res.status(400).json({ error: 'End date must be in the future' });
      }

      const fileBuffer = fs.readFileSync(file.path);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      const fileUrl = `/uploads/contracts/${file.filename}`;

      const data = await contract.create({
        franchisorId: getFranchisor.id,
        franchiseeId,
        title,
        description,
        fileUrl,
        ipfsHash: hash,
        endDate: endDates,
      });

      res.status(201).json({message: 'Contract created', data});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create contract', detail: err.message });
    }
  }
};
