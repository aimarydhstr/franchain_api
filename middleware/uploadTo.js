const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Fungsi untuk membuat penyimpanan multer ke folder spesifik
function uploadTo(folder) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = path.join(__dirname, '../uploads', folder); // Path absolut relatif terhadap file ini
      fs.mkdirSync(dir, { recursive: true }); // Buat folder jika belum ada
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const name = `${Date.now()}-${file.fieldname}${ext}`;
      cb(null, name);
    },
  });

  return multer({
    storage
  });
}

module.exports = uploadTo;
