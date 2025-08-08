require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

require('./jobs/autoComplaintJob');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routesDir = path.join(__dirname, 'routes');

fs.readdirSync(routesDir).forEach(file => {
  if (file.endsWith('.js')) {
    const route = require(path.join(routesDir, file));
    app.use('/api', route);
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('FranChain API running...');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan internal' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
