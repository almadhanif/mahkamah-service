const { Folders, File, sequelize } = require('../../models');
const InternalServerError = require('../../utils/exceptions/InternalServerError');
const NotFoundError = require('../../utils/exceptions/NotFoundError');

const createFileBulkService = async (folderId, filesData) => {
  try {
    const createdFiles = await sequelize.transaction(async (t) => {
      const parentFolder = await Folders.findByPk(folderId, { transaction: t });
      if (!parentFolder) {
        throw new NotFoundError('Folder induk tidak ditemukan');
      }

      const newFiles = await Promise.all(
        filesData.map((file) =>
          File.create(
            {
              folder_id: folderId,
              name: file.name,
              file_data: Buffer.from(file.file_data, 'base64'),
              file_type: file.file_type,
              file_size: file.file_size,
            },
            { transaction: t }
          )
        )
      );

      return newFiles;
    });

    return createdFiles;
  } catch (err) {
    throw new InternalServerError(err.message);
  }
};

module.exports = createFileBulkService;
