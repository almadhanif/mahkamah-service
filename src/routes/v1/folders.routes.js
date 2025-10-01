const express = require('express');
const router = express.Router();
const getAllFoldersController = require('../../controllers/folders/getAllFolders.controller');
const createFolderController = require('../../controllers/folders/createFolder.controller');
const updateFolderController = require('../../controllers/folders/updateFolder.controller');
const deleteFolderController = require('../../controllers/folders/deleteFolder.controller');
const getFolderContentController = require('../../controllers/folders/getFolderContent.controller');
const createFileBulkController = require('../../controllers/file/createFileBulk.controller');

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

router.get(
  /*
  #swagger.tags = ['Folders']
  #swagger.description = 'Endpoint to get the content of a specific folder by ID'
  #swagger.parameters['id'] = { description: 'Folder ID' }
  */
  '/:id',
  getFolderContentController
);

router.post(
  '/add',
  /*
  #swagger.tags = ['Folders']
  #swagger.description = 'Endpoint to create a new folder.'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Folder details',
    required: true,
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'New Project' },
        parentId: { type: 'integer', example: 1, description: 'ID of the parent folder, null for root' }
      }
    }
  }
  */
  createFolderController
);

router.post(
  '/:id/add-file/bulk',
  /*
  #swagger.tags = ['Folders']
  #swagger.description = 'Endpoint to add multiple files to a spesific folder parent'
  #swagger.parameters['id'] = { description: 'ID of the parent folder' }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'An array of file objects to upload.',
    required: true,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'laporan-q3.pdf' },
          file_data: { type: 'string', format: 'base64', example: 'JVBERi0xLjUNCi...' },
          file_type: { type: 'string', example: 'application/pdf' },
          file_size: { type: 'integer', example: 102400 }
        }
      }
    }
  }
  */
  createFileBulkController
);

// PUT (update) a folder name by ID
router.put(
  '/:id',
  /*
  #swagger.tags = ['Folders']
  #swagger.description = 'Endpoint to update a folder name.'
  #swagger.parameters['id'] = { description: 'Folder ID' }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'New folder name',
    required: true,
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Updated Project Name' }
      }
    }
  }
  */
  updateFolderController
);

// DELETE a folder by ID
router.delete(
  '/:id',
  /*
  #swagger.tags = ['Folders']
  #swagger.description = 'Endpoint to delete a folder.'
  #swagger.parameters['id'] = { description: 'Folder ID' }
  */
  deleteFolderController
);

module.exports = router;
