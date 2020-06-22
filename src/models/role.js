const db = require('../config/db')


const createRole = (data)=> {
  return new Promise((resolve, reject)=> {
    db.query('INSERT INTO role SET ?', data, (err,result)=> {
      if(!err){
        resolve(result)
      }else{
        reject(err)
      }
    })
  })
}



const readRole = ()=> {
  return new Promise((resolve, reject)=> {
    db.query('SELECT * FROM role', (err, result)=> {
      if(!err){
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}



const getRole = (roleId)=> {
  return new Promise((resolve, reject)=> {
    db.query('SELECT * FROM role WHERE role_id = ?', roleId, (err, result)=> {
      if(!err){
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}



const updateRole = (data, roleId)=> {
  return new Promise((resolve, reject)=> {
    db.query('UPDATE role SET ? WHERE role_id = ?', [data,roleId], (err, result)=> {
      if(!err){
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}


const deleteRole = (roleId)=> {
  return new Promise((resolve,reject)=> {
    db.query('DELETE FROM role WHERE role_id = ?', roleId, (err, result)=> {
      if(!err){
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}



module.exports = {
  createRole,
  readRole,
  getRole,
  updateRole,
  deleteRole
}