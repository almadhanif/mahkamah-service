const Joi = require('joi');
const { Folders, File } = require('../../models');
const InternalServerError = require('../../utils/exceptions/InternalServerError');
const NotFoundError = require('../../utils/exceptions/NotFoundError');
const { resSuccessHandler } = require('../../utils/exceptions/resHandler');
const validateDto = require('../../utils/helpers/validator');

const getFolderContentController = async (req, res, next) => {
  try {
    const { id } = await validateDto(
      req.params,
      Joi.object({
        id: Joi.number().required(),
      })
    );

    if (isNaN(id)) {
      throw new NotFoundError('Folder ID tidak valid');
    }

    // 1. Verifikasi apakah folder induk ada
    const parentFolder = await Folders.findByPk(id);
    if (!parentFolder) {
      throw new NotFoundError('Folder tidak ditemukan');
    }

    // 2. Ambil semua subfolder dan file secara paralel
    const [subfolders, files] = await Promise.all([
      Folders.findAll({
        where: { parent_id: id },
        order: [['name', 'ASC']],
        attributes: { exclude: ['deletedAt', 'updatedAt', 'createdAt'] },
      }),
      File.findAll({
        where: { folder_id: id },
        order: [['name', 'ASC']],
        attributes: {
          exclude: ['file_data', 'deletedAt', 'updatedAt', 'createdAt'], // file data tidak perlu dikirim karena bisa besar
        },
      }),
    ]);
    resSuccessHandler(res, {
      folder: {
        id: parentFolder.id,
        name: parentFolder.name,
        parent_id: parentFolder.parent_id,
      },
      content: { subfolders, files },
    });
  } catch (err) {
    throw new InternalServerError(err.message);
  }
};

module.exports = getFolderContentController;
