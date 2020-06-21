const jwt = require('jsonwebtoken')

module.exports = {
  verify : (req, res, next) => {
    const token = req.headers['x-access-token']
    try{
      jwt.verify(token, process.env.SECRET_KEY, (err,decoded)=> {
        if(decoded){
          console.log('success')
          next()
        }else{
          res.status(403).send({
            message: 'token expired'
          })
        }
      })
    }catch{
      res.status(404).send({
        message: 'invailid authorozation!'
      })
    }
  }
}