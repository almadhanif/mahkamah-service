// server.js
require('dotenv').config({ path: '.env' });

const app = require('./app');
const { sequelize } = require('./src/models');
const PORT = process.env.PORT || 5015;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
