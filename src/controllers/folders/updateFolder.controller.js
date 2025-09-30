const updateFolderService = require('../../services/folders/updateFolder.service');
const {
  resSuccessHandler,
  resErrorHandler,
} = require('../../utils/exceptions/resHandler');
const validateDto = require('../../utils/helpers/validator');
const Joi = require('joi');

const updateFolderController = async (req, res) => {
  try {
    const { id } = await validateDto(
      req.params,
      Joi.object({
        id: Joi.number().integer().min(1).required(),
      })
    );

    const { name } = await validateDto(
      req.body,
      Joi.object({
        name: Joi.string().min(2).max(100).required(),
      })
    );

    if (!name) {
      return resErrorHandler(res, {
        status: 400,
        message: 'New folder name is required',
      });
    }
    const updatedFolder = await updateFolderService(id, name);
    resSuccessHandler(res, updatedFolder, 'Folder updated successfully');
  } catch (error) {
    return resErrorHandler(res, error);
  }
};

module.exports = updateFolderController;
