const { Folders, sequelize } = require('../../models');
const InternalServerError = require('../../utils/exceptions/InternalServerError');
const NotFoundError = require('../../utils/exceptions/NotFoundError');

const updateFolderService = async (id, name) => {
  const transaction = await sequelize.transaction();
  try {
    const folder = await Folders.findByPk(id, { transaction });
    if (!folder) {
      throw new NotFoundError('Folder not found');
    }

    await folder.update({ name }, { transaction });

    await transaction.commit();
    return folder;
  } catch (err) {
    await transaction.rollback();

    if (err instanceof NotFoundError) throw err;
    throw new InternalServerError(err.message);
  }
};

module.exports = updateFolderService;
