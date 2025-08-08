const { franchisor, user } = require('../../models');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

exports.getProfile = async (req, res) => {
  try {
    const profile = await franchisor.findOne({ where: { userId: req.user.id } });
    
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil profil usaha', detail: err.message });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const existing = await franchisor.findOne({ where: { userId: req.user.id } });
    if (existing) return res.status(400).json({ message: 'Profil sudah ada, gunakan update.' });

    const { companyName, npwp, address, nib } = req.body;

    if (!companyName || !npwp || !address || !nib) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }
    console.log(req.file);

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Laporan keuangan wajib diunggah' });
    }

    const fileBuffer = fs.readFileSync(file.path);
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    const fileUrl = `/uploads/reports/${file.filename}`;

    const created = await franchisor.create({
      userId: req.user.id,
      companyName,
      npwp,
      address,
      nib,
      financialFile: fileUrl,
      ipfsHash: hash, 
      verified: 'pending'
    });

    res.status(201).json({
      message: 'Profil berhasil dibuat',
      data: created
    });
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat profil usaha', detail: err.message });
  }
};



exports.updateProfile = async (req, res) => {
  try {
    const profile = await franchisor.findOne({ where: { userId: req.user.id } });
    if (!profile) return res.status(404).json({ message: 'Profil tidak ditemukan' });

    const { companyName, npwp, address, nib } = req.body;

    await profile.update({
      companyName,
      npwp,
      address,
      nib
    });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Gagal memperbarui profil usaha' });
  }
};

