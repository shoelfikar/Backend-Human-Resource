const express = require('express')
const Router = express.Router()
const roleController = require('../controller/role')


Router
      .post('/', roleController.createRole)
      .get('/', roleController.readRole)
      .get('/:roleId', roleController.getRole)
      .put('/:roleId', roleController.updateRole)
      .delete('/:roleId', roleController.deleteRole)

module.exports = Router