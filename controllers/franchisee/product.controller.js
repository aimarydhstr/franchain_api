const { product, franchisee } = require('../../models');

module.exports = {
  // Ambil semua produk aktif milik franchisee yang sedang login
  index: async (req, res) => {
    try {
      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });

      const products = await product.findAll({
        where: {
          franchiseeId: getFranchisee.id,
          status: 'active'
        },
        order: [['createdAt', 'DESC']]
      });

      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch products', detail: err.message });
    }
  },

  // Tambahkan produk baru
  store: async (req, res) => {
    try {
      const { name, price, description } = req.body;

      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });

      const newProduct = await product.create({
        name,
        price,
        description,
        status: 'active',
        franchiseeId: getFranchisee.id
      });

      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create product', detail: err.message });
    }
  },

  // Perbarui produk
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;

      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });

      const target = await product.findOne({
        where: { id, franchiseeId: getFranchisee.id }
      });

      if (!target) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await target.update({ name, price, description });
      res.json(target);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update product', detail: err.message });
    }
  },

  // Nonaktifkan produk (soft delete)
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });

      const target = await product.findOne({ where: { id, franchiseeId: getFranchisee.id } });
      if (!target) return res.status(404).json({ error: 'Product not found' });

      await target.update({ status: 'inactive' });
      res.json({ message: 'Product set to inactive' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update product status', detail: err.message });
    }
  },

  // Aktifkan kembali produk
  restore: async (req, res) => {
    try {
      const { id } = req.params;
      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });

      const target = await product.findOne({ where: { id, franchiseeId: getFranchisee.id } });
      if (!target) return res.status(404).json({ error: 'Product not found' });

      await target.update({ status: 'active' });
      res.json({ message: 'Product reactivated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to reactivate product', detail: err.message });
    }
  },

  // (Opsional) Menampilkan semua produk nonaktif
  inactive: async (req, res) => {
    try {
      const getFranchisee = await franchisee.findOne({ where: { userId: req.user.id } });

      const products = await product.findAll({
        where: {
          franchiseeId: getFranchisee.id,
          status: 'inactive'
        },
        order: [['createdAt', 'DESC']]
      });

      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch inactive products', detail: err.message });
    }
  }
};
