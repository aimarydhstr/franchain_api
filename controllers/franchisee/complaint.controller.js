const { complaint, clarification, transaction, user, order, product, franchisee } = require('../../models');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  index: async (req, res) => {
    try {
      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });
      const data = await complaint.findAll({
        where: { franchiseeId: getFranchisee.id },
        include: [
          { model: user, as: 'consumer', attributes: ['id', 'name', 'email'] },
          { model: transaction, include: [{ model: order, include: { model: product } }] },
          { model: clarification, required: false },
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil komplain', detail: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { text, complaintId } = req.body;

      const file = req.file;
      if (!file) return res.status(400).json({ error: 'File klarifikasi diperlukan' });

      const buffer = fs.readFileSync(file.path);
      const hash = crypto.createHash('sha256').update(buffer).digest('hex');
      const fileUrl = `/uploads/clarifications/${file.filename}`;

      const clarificationData = await clarification.create({
        complaintId,
        text,
        fileUrl,
        ipfsHash: hash,
        submittedAt: new Date()
      });

      res.status(201).json({ message: 'Klarifikasi berhasil dikirim', data: clarificationData });
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengirim klarifikasi', detail: err.message });
    }
  }
};
