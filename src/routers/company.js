const express = require('express')
const companyController = require('../controller/company')
const Router = express.Router()


Router
    .post('/', companyController.createCompany)
    .get('/:userId', companyController.getCompany)
    .patch('/:userId', companyController.updateCompany)
    .delete('/:userId', companyController.deleteCompany)

module.exports = Router