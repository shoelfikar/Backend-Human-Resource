const db = require('../config/db')



const createCompany = (data)=> {
  return new Promise((resolve, reject)=> {
    db.query('INSERT INTO company SET ?', data, (err, result)=> {
      if(!err){
        resolve(result)
      }else{
        reject(err)
      }
    })
  })
}


const getCompany = (idUser)=> {
  return new Promise((resolve, reject)=> {
    db.query('SELECT * FROM company WHERE user_id = ?', idUser, (err, result)=> {
      if(!err){
        resolve(result[0])
      }else{
        reject(new Error(err))
      }
    })
  })
}


const updateCompany = (data, idUser)=> {
  return new Promise((resolve, reject)=> {
    db.query('UPDATE company SET ? WHERE user_id = ?', [data, idUser], (err, result)=> {
      if(!err){
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}


const deleteCompany = (idUser)=> {
  return new Promise((resolve,reject)=> {
    db.query('DELETE  FROM company WHERE user_id = ?', idUser, (err, result)=> {
      if(!err){
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}
module.exports = {
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany
}