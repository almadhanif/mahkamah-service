// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// Middlewares
app.use(cors()); // Mengaktifkan CORS
app.use(helmet()); // Mengamankan header HTTP
app.use(express.json()); // Mem-parsing body JSON
app.use(express.urlencoded({ extended: true })); // Mem-parsing body URL-encoded

// Request logger (hanya untuk development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiter untuk mencegah serangan brute-force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Maksimal 100 request per IP dalam 15 menit
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Health check route
app.get('/', (req, res) => {
  res
    .status(200)
    .send({ status: 'OK', message: 'LMS Backend Service is running.' });
});

// TODO: Tambahkan routes utama di sini
// const v1Routes = require('./src/routes/v1');
// app.use('/api/v1', v1Routes);

// TODO: Tambahkan middleware penanganan error

module.exports = app;
