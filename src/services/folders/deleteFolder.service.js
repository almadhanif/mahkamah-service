// Pastikan 'sequelize' di-export dari file model Anda
const { Folders, sequelize } = require('../../models');
const InternalServerError = require('../../utils/exceptions/InternalServerError');
const NotFoundError = require('../../utils/exceptions/NotFoundError');
const { Op } = require('sequelize');

const deleteFolderService = async (folderId) => {
  try {
    await sequelize.transaction(async (t) => {
      const mainFolder = await Folders.findByPk(folderId, { transaction: t });
      if (!mainFolder) {
        throw new NotFoundError('Folder not found');
      }

      // 2. Kumpulkan semua ID folder yang akan dihapus (di dalam transaksi)
      const allFolderIdsToDelete = [folderId];
      const queue = [folderId];

      while (queue.length > 0) {
        const currentParentId = queue.shift();

        // Cari semua anak (di dalam transaksi)
        const children = await Folders.findAll({
          where: { parent_id: currentParentId },
          attributes: ['id'],
          transaction: t,
        });

        for (const child of children) {
          allFolderIdsToDelete.push(child.id);
          queue.push(child.id);
        }
      }

      await Folders.destroy({
        where: {
          id: {
            [Op.in]: allFolderIdsToDelete,
          },
        },
        transaction: t,
      });
    });

    return; // Selesai
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    throw new InternalServerError(err.message);
  }
};

module.exports = deleteFolderService;
