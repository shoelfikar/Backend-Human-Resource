const db = require('../config/db')

const register =  (data)=> {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO user SET ?', data, (err, result) => {
      if(!err) {
        resolve(result)
      }else{
        reject(new Error(err))
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


const deleteUser = (idUser)=> {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM user WHERE id = ?', idUser, (err, result) => {
      if(!err){
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}


const confirmRegister = (idUser)=> {
  return new Promise((resolve, reject)=> {
    db.query('UPDATE user SET confirm = 1 WHERE id = ?',idUser, (err, result)=> {
      if(!err){
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}


const searchUser = (search)=> {
  return new Promise((resolve, reject)=> {
    db.query('SELECT * FROM user WHERE email LIKE ? OR nama_lengkap LIKE ? OR username LIKE ? OR phone LIKE ?', [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], (err, result)=> {
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
  updateUser,
  deleteUser,
  confirmRegister,
  searchUser
}