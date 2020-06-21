const express = require('express')
const userController = require('../controller/users')
const auth = require('../middleware/auth')
const Router = express.Router()


Router
    .post('/', userController.register)
    .post('/login', userController.login)
    .get('/:idUser', userController.getUser)
    .get('/',auth.verify, userController.getAllUser)
    .patch('/:idUser', userController.updateUser)
    .delete('/:idUser', userController.deleteUser)



module.exports = Router