const userModel = require('../models/users')
const valid = require('../middleware/validate')
const sendEmail = require('../middleware/sendMail')
const {v4: uuidv4} = require('uuid')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const {genSaltSync, hashSync, compareSync} = require('bcryptjs')
const helpers = require('../helpers/helpers')



const register = (req, res) => {
  const {
    nama_lengkap,
    email,
    username,
    password,
    foto,
    phone
  } = req.body

  const salt = genSaltSync(10)
  const user = valid.user()
  user.id = uuidv4()
  user.nama_lengkap = nama_lengkap
  user.email = email
  user.username = username
  user.password = hashSync(password, salt)
  user.foto = foto
  user.phone = phone
  user.role = 1
  user.status = 'active'
  user.createdAt = new Date()
  user.lastModified = new Date()
  joi.validate(req.body, valid.register, (err,result)=> {
    if(err){
      console.log(err)
      res.status(400).send({
        messages: err
      })
    }else {
      userModel.cekUser(result.email)
      .then((result)=> {
        if(result.length === 1){
          res.status(400).send({
            message: 'Email anda sudah terdaftar!'
          })
        }else{
          userModel.register(user)
          .then(() => {
            const sendRegister = sendEmail.sendMail(user)
            if(!sendRegister){
              console.log(new Error('error'))
            }
            res.send({
              result : user,
              messages: 'register success',
              status : 200
            })
          })
          .catch(err => {
            res.send({
              err: err,
              messages: 'failed to register',
              status: 404
            })
          })
        }
        })
        .catch(err => {
          console.log(err)
        })
      }
  })
}


const login = (req, res)=> {
  const {
    email,
    password
  } = req.body

  const user = valid.user()
  user.email = email
  user.password = password
  console.log(process.env.SECRET_KEY)
  userModel.cekUser(user.email)
  .then((result)=> {
    const cekPassword = compareSync(user.password, result[0].password)
    if(cekPassword){
      const token = jwt.sign({id: result[0].id, email: result[0].email, nama_lengkap: result[0].nama_lengkap}, process.env.SECRET_KEY, {expiresIn: '1h'})
      const resultNew = {
        id: result[0].id,
        fullname: result[0].nama_lengkap,
        username: result[0].username,
        token: token
      }
      helpers.response(res,resultNew, 200,'Login success!', null)
    }else{
      helpers.response(res,null, 203,'password yang anda masukkan salah', null)
    }
  })
  .catch(()=> {
    helpers.response(res,null, 403,'email belum terdaftar, silahkan daftar terlebih dahulu', null)
  })
}


const getAllUser = (req, res)=> {
  userModel.getAllUser()
  .then(result => {
    helpers.response(res,result, 200,'Data all user', null)
  })
  .catch(err => {
    helpers.response(res,null, 404,'something wrong!', err)
  })
}
module.exports = {
  register,
  login,
  getAllUser
}