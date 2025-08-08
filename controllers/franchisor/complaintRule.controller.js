const { complaint_rule, franchisor } = require('../../models');

exports.getComplaintRule = async (req, res) => {
  try {
    const getFranchisor = await franchisor.findOne({where: {userId: req.user.id}});
    
    const rules = await complaint_rule.findOne({
      where: { franchisorId: getFranchisor.id },
    });

    res.json(rules);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil aturan komplain', detail: err.message });
  }
};

exports.createComplaintRule = async (req, res) => {
  try {
    const { maxDeliveryTime, autoCompensationAmount, autoCompensationType, status } = req.body;

    if (!maxDeliveryTime || !autoCompensationType || !autoCompensationAmount || !status) {
      return res.status(400).json({ message: 'Field wajib diisi' });
    }

    const existing = await complaint_rule.findOne({
      where: {
        franchisorId: req.user.id,
        violationType: 'late'
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Rule sudah ada, gunakan update.' });
    }

    const rule = await complaint_rule.create({
      franchisorId: req.user.id,
      violationType: 'late',
      maxDeliveryTime,
      autoCompensationAmount,
      autoCompensationType,
      status
    });

    res.status(201).json({ message: 'Rule berhasil dibuat', data: rule });
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat aturan', detail: err.message });
  }
};

exports.updateComplaintRule = async (req, res) => {
  try {
    const { maxDeliveryTime, autoCompensationAmount, autoCompensationType, status } = req.body;

    const rule = await complaint_rule.findByPk(req.params.id);

    if (!rule) return res.status(404).json({ message: 'Rule tidak ditemukan' });

    await rule.update({
      maxDeliveryTime,
      autoCompensationAmount,
      autoCompensationType,
      status
    });

    res.json({ message: 'Rule berhasil diperbarui', data: rule });
  } catch (err) {
    res.status(500).json({ message: 'Gagal memperbarui aturan', detail: err.message });
  }
};
