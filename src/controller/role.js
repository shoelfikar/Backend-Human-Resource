const roleModels = require('../models/role')
const helpers = require('../helpers/helpers')


const createRole = (req, res)=> {
  const {
    role_name
  } = req.body
  const data = {
    role_name
  }
  roleModels.createRole(data)
  .then(result => {
    helpers.response(res,result,200, 'create role success', null)
  })
  .catch(err => {
    console.log(err)
    helpers.response(res,null, 403, 'something wrong!', err)
  })
}


const readRole = (req, res)=> {
  roleModels.readRole()
  .then(result => {
    helpers.response(res, result, 200, 'get all role user', null)
  })
  .catch(err => {
    helpers.response(res, null, 403, 'something wrong!', err)
  })
}


const getRole = (req, res)=> {
  const roleId = req.params.roleId
  roleModels.getRole(roleId)
  .then(result => {
    if(result.length == 0){
      helpers.response(res, null, 404, `id ${roleId} tidak ditemukan`, null)
    }else{
      helpers.response(res, result, 200, `id role ${roleId} ditemukan`, null)
    }
  })
  .catch(err => {
    console.log(err)
    helpers.response(res, null,403, 'something wrong!', err)
  })
}


const updateRole = (req, res)=> {
  const roleId = req.params.roleId
  const {
    role_name
  } = req.body
  const data = {
    role_name
  }
  roleModels.updateRole(data, roleId)
  .then(result => {
    if(result.affectedRows == 0){
      helpers.response(res,null,404,`role id ${roleId} tidak ditemukan `, null)
    }else{
      helpers.response(res,data,200,`role id ${roleId} berhasil di update `, null)
    }
  })
  .catch(err => {
    helpers.response(res, null, 403, 'something wrong', err)
  })
}


const deleteRole = (req, res)=> {
  const roleId = req.params.roleId
  roleModels.deleteRole(roleId)
  .then(result => {
    if(result.affectedRows == 0){
      helpers.response(res,null,404,`role id ${roleId} tidak ditemukan `, null)
    }else{
      helpers.response(res, result, 200, `role id ${roleId} berhasil di hapus`)
    }
  })
  .catch(err => {
    console.log(err)
    helpers.response(res, null, 403, 'something wrong!', err)
  })
}
module.exports = {
  createRole,
  readRole,
  getRole,
  updateRole,
  deleteRole
}