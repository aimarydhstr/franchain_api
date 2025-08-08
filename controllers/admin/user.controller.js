const { user } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const users = await user.findAll({
        attributes: ['id', 'name', 'username', 'email', 'role', 'status']
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil data user', detail: err.message });
    }
  },

  list: async (req, res) => {
    try {
      const users = await user.findAll({
        where: { status: 'pending' },
        attributes: ['id', 'name', 'username', 'email', 'role', 'status']
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil data user', detail: err.message });
    }
  },

  show: async (req, res) => {
    try {
      const data = await user.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'name', 'username', 'email', 'role']
      });
      if (!data) return res.status(404).json({ error: 'User tidak ditemukan atau nonaktif' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil data', detail: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name, username, email, password, role } = req.body;
      if (!username || !email || !password || !role)
        return res.status(400).json({ error: 'Semua field wajib diisi' });
      const data = await user.create({ username, email, password, role, status: 'aktif' });
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Gagal membuat user', detail: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const data = await user.findByPk(req.params.id);
      if (!data)
        return res.status(404).json({ error: 'User tidak ditemukan atau nonaktif' });
      await data.update(req.body);
      res.json({ message: 'User berhasil diperbaharui', data });
    } catch (err) {
      res.status(500).json({ error: 'Gagal memperbarui user', detail: err.message });
    }
  },

  active: async (req, res) => {
    try {
      const data = await user.findByPk(req.params.id);
      if (!data || !data.status)
        return res.status(404).json({ error: 'User tidak ditemukan atau sudah nonaktif' });
      await data.update({ status: 'aktif' });
      res.json({ message: 'User berhasil diaktifkan' });
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengaktifkan user', detail: err.message });
    }
  },

  nonactive: async (req, res) => {
    try {
      const data = await user.findByPk(req.params.id);
      if (!data || !data.status)
        return res.status(404).json({ error: 'User tidak ditemukan atau sudah nonaktif' });
      await data.update({ status: 'tidak aktif' });
      res.json({ message: 'User berhasil dinonaktifkan' });
    } catch (err) {
      res.status(500).json({ error: 'Gagal menonaktifkan user', detail: err.message });
    }
  },
};