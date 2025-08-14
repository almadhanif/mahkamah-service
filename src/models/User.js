const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const tb_name = `tb_user`;
  class User extends Model {}

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deletedAt: {
        type: 'TIMESTAMP',
        allowNull: true,
      },
      createdAt: {
        type: 'TIMESTAMP',
        allowNull: false,
      },
      updatedAt: {
        type: 'TIMESTAMP',
        allowNull: false,
      },
    },
    {
      tableName: tb_name,
      timestamps: true,
      paranoid: true,

      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'User', // We need to choose the model name
    }
  );

  // User.associate = function (models) {
  //   // associations can be defined here
  //   User.hasOne(models.Employee, {
  //     foreignKey: 'user_id',
  //     as: 'Employee',
  //   });
  //   return User;
  // };

  return User;
};
