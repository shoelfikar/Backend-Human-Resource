const express = require('express')
const Router = express.Router()
const users = require('./users')
const role = require('./role')
const company = require('./company')


Router
    .use('/user', users)
    .use('/role', role)
    .use('/company', company)
    .get('/', (req,res) => {
        res.send({
            Messages: 'Welcome to HRD 1.0 API',
            Author: 'Sulfikardi',
            version: '1.0'
        })
    })


module.exports = Router