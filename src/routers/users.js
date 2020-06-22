const express = require('express')
const userController = require('../controller/users')
const auth = require('../middleware/auth')
const Router = express.Router()


Router
    .get('/activated', userController.confirmRegister)
    .get('/search',auth.verify, userController.searchUser)
    .post('/register', userController.register)
    .post('/login', userController.login)
    .get('/linkreset', userController.linkResetPassword)
    .post('/forgetpassword/:reset', userController.forgetPassword)
    .get('/:idUser',auth.verify, userController.getUser)
    .get('/',auth.verify, userController.getAllUser)
    .patch('/:idUser',auth.verify, userController.updateUser)
    .delete('/:idUser',auth.verify, userController.deleteUser)



module.exports = Router