// server.js
require('dotenv').config({ path: '.env' });

const app = require('./app');
const sequelize = require('./database/connection');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sinkronisasi model (opsional, lebih baik gunakan migrasi di produksi)
    // await sequelize.sync({ alter: true });
    // console.log('All models were synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
