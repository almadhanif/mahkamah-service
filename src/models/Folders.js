const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const tb_name = `tb_folders`;
  class Folders extends Model {}

  Folders.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
      },
    },
    {
      tableName: tb_name,
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'Folders',
    }
  );

  return Folders;
};
