const { user, franchisee, franchisor } = require('../../models');
const bcrypt = require('bcrypt');


exports.index = async (req, res) => {
  try {
    const getFranchisor = await franchisor.findOne({ where: { userId: req.user.id } });
    
    const list = await franchisee.findAll({
      where: { franchisorId: getFranchisor.id },
      include: [
        { model: user, attributes: { exclude: ['password'] } },
        { model: franchisor }
      ]
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil daftar franchisee' });
  }
};


exports.create = async (req, res) => {
  try {
    const { name, username, email, password, outletCode, location } = req.body;

    if (!name || !username || !email || !password || !outletCode || !location) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    const existingUsername = await user.findOne({ where: { username } });
    if (existingUsername) return res.status(400).json({ message: 'Username sudah digunakan' });

    const existingEmail = await user.findOne({ where: { email } });
    if (existingEmail) return res.status(400).json({ message: 'Email sudah digunakan' });

    const franchisorData = await franchisor.findOne({ where: { userId: req.user.id } });
    if (!franchisorData) return res.status(403).json({ message: 'Anda bukan franchisor' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      username,
      email,
      password: hashed,
      role: 'franchisee',
      status: 'pending'
    });

    const newFranchisee = await franchisee.create({
      userId: newUser.id,
      franchisorId: franchisorData.id,
      outletCode,
      outletName: name,
      location,
      active: true
    });

    res.status(201).json({
      message: 'Franchisee berhasil dibuat',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role
        },
        franchisee: newFranchisee
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal membuat franchisee', detail: err.message });
  }
};



exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, outletCode, location } = req.body;

    const target = await franchisee.findOne({
      where: { id, franchisorId: req.user.id },
      include: [{ model: user }]
    });

    if (!target) return res.status(404).json({ message: 'Franchisee tidak ditemukan' });

    await target.user.update({ name, email });
    await target.update({ name, outletCode, location });

    res.json({ message: 'Franchisee berhasil diperbarui', data: target });
  } catch (err) {
    res.status(500).json({ message: 'Gagal memperbarui data franchisee' });
  }
};


exports.disable = async (req, res) => {
  try {
    const { id } = req.params;

    const franchisorData = await franchisor.findOne({ where: { userId: req.user.id } });
    if (!franchisorData) return res.status(403).json({ message: 'Anda bukan franchisor' });

    const target = await franchisee.findOne({
      where: { id, franchisorId: franchisorData.id },
      include: [{ model: user }]
    });

    if (!target) return res.status(404).json({ message: 'Franchisee tidak ditemukan' });

    await target.update({ active: false });
    await target.user.update({ status: 'tidak aktif' });

    res.json({ message: 'Franchisee berhasil dinonaktifkan' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menonaktifkan franchisee', detail: err.message });
  }
};

