const companyModels = require('../models/company')
const userModels = require('../models/users')
const helpers = require('../helpers/helpers')
const {v4: uuidv4} = require('uuid')
const joi = require('joi')
const valid = require('../validate/company')




const createCompany = (req, res)=> {
  const {
    user_id,
    name,
    address,
    phone,
    city,
    jenis_usaha,
    company_email
  }= req.body
  const data = {
    company_id : uuidv4(),
    user_id: user_id,
    name : name.toUpperCase(),
    phone: phone,
    address: address.toUpperCase(),
    city : city.toUpperCase(),
    jenis_usaha : jenis_usaha.toUpperCase(),
    company_email: company_email,
    createdAt: new Date(),
    lastModified : new Date()
  }
  userModels.getUser(user_id)
  .then(result => {
    if(result.confirm === 0){
      helpers.response(res, null, 403, 'anda belum melakukan konfirmasi email', null)
    }else{
      joi.validate(req.body, valid.createCompany, (err, result)=> {
        if(err){
          helpers.response(res, null, 403, 'failed', err.details[0].message)
        }else{
          companyModels.createCompany(data)
          .then(() => {
            helpers.response(res, result, 200, 'data perusahaan berhasil ditambahkan', null)
          })
          .catch(err => {
            helpers.response(res, null, 403, 'something wrong', err)
          })
        }
      })
    }
  })
  .catch(err => {
    helpers.response(res, null, 403, 'something wrong!', err)
  })
}



const getCompany = (req, res)=> {
  const userId = req.params.userId
  companyModels.getCompany(userId)
  .then(result => {
    if(result == undefined){
      helpers.response(res, result,404, `data company tidak ditemukan`, null)
    }else{
      helpers.response(res, result,200, `data company dari user ${userId}`, null)
    }
  })
  .catch(err => {
    helpers.response(res, null, 403, 'something wrong', err)
  })
}


const updateCompany = (req, res)=> {
  const userId = req.params.userId
  const {
    name,
    address,
    phone,
    city,
    jenis_usaha,
    company_email
  } = req.body
  companyModels.getCompany(userId)
  .then(result => {
    if(result == undefined){
      helpers.response(res, result,404, `data company tidak ditemukan`, null) 
    }else{
      const data = {
        name: name || result.name,
        address: address || result.address,
        phone : phone || result.phone,
        city : city || result.city,
        jenis_usaha : jenis_usaha || result.jenis_usaha,
        company_email: company_email || result.company_email,
        createdAt : result.createdAt,
        lastModified : new Date()
      }
      companyModels.updateCompany(data, result.user_id)
      .then(()=> {
        helpers.response(res, data, 200, 'data company berhasil di update', null)
      })
      .catch(err => {
        helpers.response(res, null, 403, 'something wrong', err)
      })
    }
  })
  .catch(err => {
    helpers.response(res, null, 403, 'something wrong', err)
  })
}


const deleteCompany = (req, res)=> {
  const userId = req.params.userId
  companyModels.deleteCompany(userId)
  .then( result=> {
    if(result.affectedRows == 0){
      helpers.response(res, null, 403, 'data company tidak ditemukan', null)
    }else{
      helpers.response(res, result, 200, 'data perusahaan berhasil di hapus', null)
    }
  })
  .catch(err => {
    helpers.response(res, null, 403, 'something wrong', err)
  })
}
module.exports = {
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany
}