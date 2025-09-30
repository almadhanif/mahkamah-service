const deleteFolderService = require('../../services/folders/deleteFolder.service');
const {
  resSuccessHandler,
  resErrorHandler,
} = require('../../utils/exceptions/resHandler');
const validateDto = require('../../utils/helpers/validator');
const Joi = require('joi');

const deleteFolderController = async (req, res) => {
  try {
    const { id } = await validateDto(
      req.params,
      Joi.object({
        id: Joi.number().required(),
      })
    );

    await deleteFolderService(id);
    resSuccessHandler(res, null, 'Folder deleted successfully');
  } catch (error) {
    return resErrorHandler(res, error);
  }
};

module.exports = deleteFolderController;
