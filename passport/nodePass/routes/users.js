const mysql = require('mysql');
const dbConfig = require('../config/config');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer')

const connection = mysql.createConnection(dbConfig.connect);
connection.query('USE ' + dbConfig.database);

module.exports = function(app, passport, errors) {
  // home page (trang chủ, server render file welcome đc lưu trong views)
  app.get('/', (req, res) => res.render('welcome'));
  // đường dẫn /users server render profile để hiển thị thông tin của user.
  app.get('/users', isLoggedIn, function(req, res) { // vào đường dẫn /users,    
    connection.query("SELECT confirm FROM users WHERE username = ?",[req.user.username], function(err, rows) {
      if (rows[0].confirm == 'true'){
        res.render('profile', {
          user : req.user // lấy user từ session đc được lưu vô từ phần register or login
        })
      }else{
        res.redirect('/users/register');
      }
    })
  });

  require('./loginProcess')(app, passport, errors)

  
  // after register get link /users/confirm to notice verify email
  app.get('/users/confirm', (req, res) => {
    res.render('confirmEmail')
  })

  // get logout and redirect to /users/login
  app.get('/users/logout', function(req, res) {
    req.logout();
    res.redirect('/users/login');
});

  require('./registerProcess')(app, passport, errors)
  require('./changePassProcess')(app, errors)
  require('./getAcountProcess')(app, errors, passport)
//&&   app.get('/users/getAcount', (req, res) => {
//&&     res.render('getAcount', {errors})
//&&   })


  //&&app.post('/users/getAcount', (req, res) => {
  //&&  const {username} = req.body
  //&&  console.log(username)
  //&&  connection.query('select *from users where username = ?', [username], function(err, rows){
  //&&    if (err){
  //&&      res.send(err)
  //&&    }
  //&&    if (!rows.length){
  //&&      console.log('username not found')
  //&&      errors.push({msg: 'username not found'})
  //&&      res.redirect('/users/getAcount')
  //&&    }else{
//&&
  //&&      const codeSend = Math.floor(Math.random()*899999) + 100000
  //&&      const output = `
  //&&      <p>You have a new contact request</p>
  //&&      <h3>Hello. Your code is ${codeSend} </h3>`
  //&&      
  //&&      const transporter = nodemailer.createTransport({
  //&&        service: 'Gmail',
  //&&        auth: {
  //&&          user: 'nguyenvanlongt2@gmail.com',
  //&&          pass: '01665596604'
  //&&        },
  //&&        tls: {
  //&&          rejectUnauthorrized: false
  //&&        }
  //&&      })
  //&&      const mailOptions = {
  //&&        from: '"Nodemailer code" <nguyenvanlongt2@gmail.com',
  //&&        // to: `${username}`,
  //&&        to: 'longvlxx99@gmail.com',
  //&&        subject: 'Node give you the code', // Subject line
  //&&        text: 'Hello world?', // plain text body
  //&&        html: output
  //&&      }
  //&&      transporter.sendMail(mailOptions, (error, info) =>{
  //&&        if (error){
  //&&          res.send(error)
  //&&        }
  //&&      })
  //&&      console.log('send code success')
  //&&      app.get('/users/getAcount/code', (req, res) => {
  //&&        res.render('code', {errors})
  //&&      })
  //&&      app.post('/users/getAcount/code', (req, res) => {
  //&&        const {codeConfirm, newPassword} = req.body
  //&&        if (codeConfirm != codeSend){
  //&&          console.log("code wrong")
  //&&          errors.push({msg: 'code wrong'})
  //&&          res.redirect('/users/getAcount/code')
  //&&        }else{
  //&&          passChange = bcrypt.hashSync(newPassword, null, null)
  //&&          connection.query(`update users set password = '${passChange}' where username = ?`, [username])
  //&&          errors.push({msg: 'get acount success'})
  //&&          res.redirect('/users/login')
  //&&        }
  //&&      })
  //&&      console.log('get link code')
  //&&      res.redirect('/users/getAcount/code')
  //&&    }
  //&&  })
  //&&})

  // ????? input next là gì??, next chuyển sang middleware tiếp theo trong stack
function isLoggedIn(req, res, next) {
  // xác thực người dùng có đang đăng nhập hay k?
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
}