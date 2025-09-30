const { Folders } = require('../../models');
const InternalServerError = require('../../utils/exceptions/InternalServerError');

const createFolderService = async (name, parentId) => {
  try {
    const newFolder = await Folders.create({
      name,
      parent_id: parentId || null,
    });
    return newFolder;
  } catch (err) {
    throw new InternalServerError(err.message);
  }
};

module.exports = createFolderService;
