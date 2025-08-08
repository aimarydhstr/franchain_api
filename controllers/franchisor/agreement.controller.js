const { agreement, franchisor, franchisee } = require('../../models');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

module.exports = {
  index: async (req, res) => {
    try {
      const getFranchisor = await franchisor.findOne({ where: { userId: req.user.id } });
      const data = await agreement.findAll({ where: { franchisorId: getFranchisor.id },
        include: [{ model: franchisor }, { model: franchisee }]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get agreement', detail: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { franchiseeId, title } = req.body;

      const getFranchisor = await franchisor.findOne({ where: { userId: req.user.id } });

      if (!franchiseeId || !title) {
        return res.status(400).json({ error: 'Field must be filled' });
      }

      const file = req.file;
      console.log(file);
      if (!file) {
        return res.status(400).json({ error: 'Agreement file must be uploaded' });
      }

      const fileBuffer = fs.readFileSync(file.path);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      const fileUrl = `/uploads/agreements/${file.filename}`;

      const data = await agreement.create({
        franchisorId: getFranchisor.id,
        franchiseeId,
        title: title,
        fileUrl,
        ipfsHash: hash,
        status: 'pending'
      });

      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create agreement', detail: err.message });
    }
  }
};