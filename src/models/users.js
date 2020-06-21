const db = require('../config/db')

const register =  (data)=> {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO user SET ?', data, (err, result) => {
      if(!err) {
        resolve(result)
      }else{
        reject(new Error('Data sudah ada'))
      }
    })   
  })
}

const cekUser = (email)=> {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user WHERE email = ?', email, (err, result) => {
      if(!err){
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}

const getAllUser = ()=> {
  return new Promise((resolve,reject) => {
    db.query('SELECT * FROM user ', (err, result) => {
      if(!err) {
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}

const getUser = (idUser)=> {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user WHERE id = ?', idUser, (err, result) => {
      if(!err){
        resolve(result[0])
      }else{
        reject(new Error(err))
      }
    })
  })
}


const updateUser = (data, idUser)=> {
  return new Promise((resolve, reject) => {
    db.query('UPDATE user SET ? WHERE id = ?', [data, idUser], (err, result) => {
      if(!err){
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}
module.exports = {
  register,
  cekUser,
  getAllUser,
  getUser,
  updateUser
}