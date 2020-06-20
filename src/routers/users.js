const express = require('express')
const userController = require('../controller/users')
const Router = express.Router()


Router
    .post('/', userController.register)
    .post('/login', userController.login)



module.exports = Router