const userModel = require('../models/users')
const valid = require('../middleware/validate')
const sendEmail = require('../middleware/sendMail')
const {v4: uuidv4} = require('uuid')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const mustache = require('mustache')
const {genSaltSync, hashSync, compareSync} = require('bcryptjs')
const helpers = require('../helpers/helpers')


/**
 * @api {post} http://localhost:9000/api/v1/hrd/user/register register user
 * @apiName  register
 * @apiGroup user
 * @apiSuccess {string} id id user
 * @apiSuccess {string} nama_lengkap nama lengkap 
 */


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
  user.confirm = 0
  user.createdAt = new Date()
  user.lastModified = new Date()
  joi.validate(req.body, valid.register, (err,result)=> {
    if(err){
      helpers.response(res,null, 404,'failed',err.details[0].message )
    }else {
      userModel.cekUser(result.email)
      .then((result)=> {
        if(result.length === 1){
          helpers.response(res,null, 403,'Email anda sudah terdaftar!', null)
        }else{
          userModel.register(user)
          .then(() => {
            const token = jwt.sign({id: user.id, email: user.email, nama_lengkap: user.nama_lengkap}, process.env.SECRET_KEY)
            const html = fs.readFileSync('./template/html/register.html', 'utf8')
            const renderHtml = mustache.render(html, {nama: user.nama_lengkap, token: token})
            const mailOptions = {
              from: process.env.EMAIL,
              to: user.email,
              subject: 'Registrasi Akun',
              html: renderHtml
            }
            const sendRegister = sendEmail.sendMail(mailOptions)
            if(sendRegister){
              console.log(new Error('error'))
            }
              helpers.response(res,user, 200,'Registrasi berhasil, cek email anda untuk activasi akun!', token)
          })
          .catch(err => {
            helpers.response(res,null, 404,'something wrong!', err)
          })
        }
        })
        .catch(err => {
          helpers.response(res,null, 404,'something wrong!', err)
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


const getUser = (req, res)=> {
  const idUser = req.params.idUser
  userModel.getUser(idUser)
  .then(result => {
    if(result.length == 0){
      helpers.response(res,null, 400,`id ${idUser} tidak ditemukan`, null)
    }else{
      delete result.password
      helpers.response(res,result, 200,`data dari user dengan id: ${idUser}`, null)
    }
  })
  .catch(err => {
    helpers.response(res,null, 404,'something wrong!', err)
  })
}


const updateUser = (req, res)=> {
  const idUser = req.params.idUser
  const {
    nama_lengkap,
    username,
    foto,
    phone
  } = req.body
  userModel.getUser(idUser)
  .then(result => {
    if(result == undefined){
      helpers.response(res,null, 400,`id ${idUser} tidak ditemukan`, null)
    }else{
      const user = {
        nama_lengkap : nama_lengkap || result.nama_lengkap,
        username :username || result.username,
        foto : foto || result.foto,
        phone : phone || result.phone,
        lastModified : new Date()
      }
      joi.validate(req.body, valid.updateUser, (err)=> {
        if(err){
          res.json({
            message : err.details[0].message
          })
        }else{
          console.log(user)
          userModel.updateUser(user, idUser)
          .then(result => {
            helpers.response(res,result, 200,`data dari id:${idUser} berhasil di update`, null)
          })
          .catch((err)=> {
            console.log(err)
            helpers.response(res,null, 404,'something wrong!', err)
          })
        }
      })
    }
  })
  .catch(err => {
    console.log(err)
    helpers.response(res,null, 404,'something wrong!', err)
  })
}


const deleteUser = (req, res)=> {
  const idUser = req.params.idUser
  userModel.deleteUser(idUser)
  .then(result => {
    if(result.affectedRows == 0){
      helpers.response(res,null, 400,`id ${idUser} tidak ditemukan`, null)
    }else{
      helpers.response(res,result, 200,`data dari id:${idUser} berhasil di hapus`, null)
    } 
  })
  .catch(err => {
    console.log(err)
    helpers.response(res,null, 404,'something wrong!', err)
  })
}


const confirmRegister = (req, res)=> {
  const reqToken = req.query.token
  jwt.verify(reqToken, process.env.SECRET_KEY, (err,result)=> {
    if(err){
      console.log(err)
      helpers.response(res,null, 404,'failed activation', err)
    }else{
      userModel.confirmRegister(result.id)
      .then(()=> {
        helpers.response(res,result, 200,'activation success', null)
      })
      .catch((err)=> {
        console.log(err)
        helpers.response(res,null, 404,'failed activation', err)
      })
    }
  })
}


const searchUser = (req, res)=> {
  const search = req.query.search
  userModel.searchUser(search)
  .then(result => {
    helpers.response(res,result, 200,`data pencarian anda ditemukan`, null)
  })
  .catch(err => {
    helpers.response(res,null, 200,`data pencarian user dengan keyword ${search} tidak ditemukan`, err)
  })
}



module.exports = {
  register,
  login,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  confirmRegister,
  searchUser
}