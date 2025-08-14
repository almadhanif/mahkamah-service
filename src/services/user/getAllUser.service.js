const InternalServerError = require('../../utils/exceptions/InternalServerError');
const NotFoundError = require('../../utils/exceptions/NotFoundError');
const {
  resErrorHandler,
  resSuccessHandler,
} = require('../../utils/exceptions/resHandler');
const sequelize = require('sequelize');
const { User } = require('../../models');

const getAllUserService = async ({}) => {
  try {
    const users = await User.findAll({
      attributes: ['user_id', 'name', 'email', 'role_code'],
    });
    if (!users || users.length === 0) {
      throw new NotFoundError('No users found');
    }

    return users;
  } catch (error) {
    throw InternalServerError(error.message);
  }
};

module.exports = getAllUserService;
