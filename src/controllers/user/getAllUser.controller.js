const getAllUserService = require('../../services/user/getAllUser.service');
const {
  resErrorHandler,
  resSuccessHandler,
} = require('../../utils/exceptions/resHandler');

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUserService({});
    return resSuccessHandler(res, users);
  } catch (error) {
    return resErrorHandler(res, error);
  }
};

module.exports = getAllUsersController;
