const getAllFoldersService = require('../../services/folders/getAllFolders.service');
const {
  resErrorHandler,
  resSuccessHandler,
} = require('../../utils/exceptions/resHandler');

const getAllFoldersController = async (req, res) => {
  try {
    const data = await getAllFoldersService();
    console.log('data controlelr:', data);
    resSuccessHandler(res, data);
  } catch (error) {
    return resErrorHandler(res, error);
  }
};

module.exports = getAllFoldersController;
