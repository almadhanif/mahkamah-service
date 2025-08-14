const express = require('express');
const router = express.Router();

const User = require('../../controllers/user/index');
const authMiddleware = require('../../middleware/auth/authMiddleware');

router.get(
  /*
  #swagger.tags = ['User']
  #swagger.description = 'Endpoint to get all users'
  */
  '/all',
  // authMiddleware,
  User.getAllUsersController
);

module.exports = router;
