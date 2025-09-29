// app.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const NotFoundError = require('./src/utils/exceptions/NotFoundError');
const { resErrorHandler } = require('./src/utils/exceptions/resHandler');

const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const swaggerOutputPath = './swagger-output.json';

const IndexRoutes = require('./src/routes/v1/index.routes');
const userLoginRoutes = require('./src/routes/v1/login.routes');
const UserRoutes = require('./src/routes/v1/user.routes');
const FolderRoutes = require('./src/routes/v1/folders.routes');

// Generate swagger-output.json if it does not exist
if (!fs.existsSync(swaggerOutputPath)) {
  console.error(
    'swagger-output.json not found. Please generate it by running: npm run swagger-autogen'
  );
  throw new Error(
    'swagger-output.json not found. Please generate it by running: npm run swagger-autogen'
  );
}

const swaggerDocs = require(swaggerOutputPath);
const app = express();

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(helmet()); // Mengamankan header HTTP
app.use(express.json()); // Mem-parsing body JSON
app.use(express.urlencoded({ extended: true })); // Mem-parsing body URL-encoded
app.use(cookieParser()); // Mem-parsing cookies

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check route
app.use('/', IndexRoutes);
app.use('/auth', userLoginRoutes);

app.use('/user', UserRoutes);
app.use('/folder', FolderRoutes);

app.use(function (req, res, next) {
  try {
    throw new NotFoundError('Api Endpoint Not Found');
  } catch (error) {
    return resErrorHandler(res, error);
  }
});

module.exports = app;
