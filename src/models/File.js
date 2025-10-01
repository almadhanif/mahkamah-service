const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const tb_name = `tb_file`;
  class File extends Model {}

  File.init(
    {
      file_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      folder_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Folders',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // !sementara, nanti akan dimigrasi ke AWS S3 dan hanya menyimpan URL saja
      file_data: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
      },
      file_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_size: {
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
      modelName: 'File',
    }
  );

  return File;
};
