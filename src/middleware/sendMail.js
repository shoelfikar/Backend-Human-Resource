const mailer = require('nodemailer')

const sendMail = (mailOptions) => {
  const transporter = mailer.createTransport({
    service : 'gmail',
    auth : {
      user : process.env.EMAIL,
      pass : process.env.EMAIL_PASS
    }
  })
  // const mailOptions = {
  //   from: process.env.EMAIL,
  //   to: user.email,
  //   subject: 'Registrasi Akun',
  //   html: `<p>Hi ${user.nama_lengkap}, Silahkan Klik tautan dibawah ini untuk konfirmasi alamat email anda</p>`
  // }
  transporter.sendMail(mailOptions, (error, info)=> {
    if(error){
      console.log(error)
    }else {
      console.log(info)
    }
  })
}

module.exports = {
  sendMail
}