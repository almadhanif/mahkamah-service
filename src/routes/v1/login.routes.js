const express = require('express');
const router = express.Router();
const userLoginController = require('../../controllers/auth/userLogin.controller');
const cookieAuthMiddleware = require('../../middleware/auth/cookieMiddleware');
const userLogoutController = require('../../controllers/auth/userLogout.controller');
const userRegisterController = require('../../controllers/auth/userRegister.controller');

//! Swagger documentation for the login route
router.post(
  /*
  #swagger.tags = ['Auth']
  #swagger.description = 'Endpoint to login user'
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 }
          },
          required: ['email', 'password']
        }
      }
    }
  }
  */
  '/login',
  userLoginController
);

router.post(
  /*
  #swagger.tags = ['Auth']
  #swagger.description = 'Endpoint to register user'
  */
  '/register',
  userRegisterController
);

router.post(
  /*
  #swagger.tags = ['Auth']
  #swagger.description = 'Endpoint to logout user'
  */
  '/logout',
  cookieAuthMiddleware,
  userLogoutController
);

module.exports = router;
