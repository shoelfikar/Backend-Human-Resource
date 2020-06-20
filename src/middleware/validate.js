const joi = require('joi')


const register = joi.object().keys({
  nama_lengkap : joi.string().required(),
  email: joi.string().trim().email({minDomainAtoms : 2}).required(),
  password: joi.string(),
  username : joi.string().min(5).required(),
  foto: joi.string(),
  phone: joi.string().min(8).max(15).regex(/^(\+62|62|0)/).required()
})

const user = ()=> {
  const model = {
    id: '',
    nama_lengkap : '',
    email : '',
    username : '',
    password : '',
    foto : '',
    phone : '',
    role : '',
    status : '',
    createdAt : '',
    lastModified : ''
  }
  return model
}
module.exports = {
  register,
  user
}