const createFileBulkService = require('../../services/file/createFileBulk.service');
const {
  resSuccessHandler,
  resErrorHandler,
} = require('../../utils/exceptions/resHandler');
const validateDto = require('../../utils/helpers/validator');
const Joi = require('joi');

const createFileBulkController = async (req, res) => {
  try {
    const { id } = await validateDto(
      req.params,
      Joi.object({
        id: Joi.number().required(),
      })
    );
    const files = await validateDto(
      req.body,
      Joi.array()
        .items(
          Joi.object({
            name: Joi.string().min(2).max(100).required(),
            file_data: Joi.string().base64().required(),
            file_type: Joi.string().required(),
            file_size: Joi.number().min(0).required(),
            url: Joi.string().uri().optional().allow(null, ''),
          })
        )
        .min(1)
        .required()
    );
    const file = await createFileBulkService(id, files);
    resSuccessHandler(res, file);
  } catch (error) {
    return resErrorHandler(res, error);
  }
};

module.exports = createFileBulkController;
