'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // The 'up' function is executed when you run the migration.
    // It creates the tb_user table with all the specified columns.
    await queryInterface.createTable('tb_user', {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uid: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // For paranoid (soft delete)
      deletedAt: {
        type: Sequelize.DATE, // Use DATE type for timestamps in migrations
        allowNull: true,
      },
      // For timestamps: true
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Set a default value
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // The 'down' function is executed when you roll back the migration.
    // It safely drops the tb_user table.
    await queryInterface.dropTable('tb_user');
  },
};
