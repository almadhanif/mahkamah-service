const express = require('express');
const router = express.Router();
const getAllFoldersController = require('../../controllers/folders/getAllFolders.controller');

//! Swagger documentation for foldering routes
router.get(
  /*
  #swagger.tags = ['Folders']
  #swagger.description = 'Endpoint to get all folders in a hierarchical structure'
  #swagger.responses[200] = {
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  name: { type: 'string', example: 'Documents' },
                  parent_id: { type: ['integer', 'null'], example: null },
                  children: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer', example: 4 },
                        name: { type: 'string', example: 'Work' },
                        parent_id: { type: 'integer', example: 1 },
                        children: { type: 'array', items: {} }
                      }
                    }
                  }
                }
              }
            },
            message: { type: 'string', example: 'success' },
            code: { type: 'integer', example: 200 }
          }
        }
      }
    }
  }
  */
  '/all',
  getAllFoldersController
);

// router.post(
//   /*
//   #swagger.tags = ['Auth']
//   #swagger.description = 'Endpoint to logout user'
//   */
//   '/',
//   cookieAuthMiddleware,
//   userLogoutController
// );

module.exports = router;
