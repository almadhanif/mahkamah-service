const { Folders } = require('../../models');
const buildTree = require('../../utils/helpers/buildFolderTree');
const InternalServerError = require('../../utils/exceptions/InternalServerError');

const getAllFoldersService = async () => {
  try {
    const data = await Folders.findAll({ where: { deletedAt: null } });
    const tree = buildTree(data);
    return tree;
  } catch (err) {
    throw new InternalServerError(err.message);
  }
};

module.exports = getAllFoldersService;
