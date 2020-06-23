const joi = require('joi')


const createCompany = joi.object().keys({
  user_id: joi.string(),
  name : joi.string().min(3).required(),
  address : joi.string(),
  phone : joi.string().min(5),
  city : joi.string(),
  jenis_usaha : joi.string(),
  company_email : joi.string().trim().email({minDomainAtoms : 2})
})




module.exports = {
  createCompany
}