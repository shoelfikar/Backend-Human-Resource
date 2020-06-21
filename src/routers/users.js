const express = require('express')
const userController = require('../controller/users')
const auth = require('../middleware/auth')
const Router = express.Router()


Router
    .post('/', userController.register)
    .post('/login', userController.login)
    .get('/',auth.verify, userController.getAllUser)



module.exports = Router