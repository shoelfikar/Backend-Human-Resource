const express = require('express')
const Router = express.Router()
const users = require('./users')


Router
    .use('/user', users)
    .get('/', (req,res) => {
        res.send({
            Messages: 'Welcome to HRD 1.0 API',
            Author: 'Sulfikardi',
            version: '1.0'
        })
    })


module.exports = Router