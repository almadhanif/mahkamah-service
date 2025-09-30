const createFolderService = require('../../services/folders/createFolder.service');
const {
  resSuccessHandler,
  resErrorHandler,
} = require('../../utils/exceptions/resHandler');
const validateDto = require('../../utils/helpers/validator');
const Joi = require('joi');

const createFolderController = async (req, res) => {
  try {
    const { name, parentId } = await validateDto(
      req.body,
      Joi.object({
        name: Joi.string().min(2).max(100).required(),
        parentId: Joi.number().optional().allow(null),
      })
    );
    if (!name) {
      return resErrorHandler(res, {
        status: 400,
        message: 'Folder name is required',
      });
    }
    const folder = await createFolderService(name, parentId);
    resSuccessHandler(res, folder, 'Folder created successfully', 201);
  } catch (error) {
    return resErrorHandler(res, error);
  }
};

module.exports = createFolderController;
