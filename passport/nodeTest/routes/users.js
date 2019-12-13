const mysql = require('mysql');
const dbConfig = require('../config/config');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer')

const connection = mysql.createConnection(dbConfig.connect);
connection.query('USE ' + dbConfig.database);

module.exports = function(app, passport, errors) {
  // home page (trang chủ, server render file welcome đc lưu trong views)
  app.get('/', (req, res) => res.render('welcome',{errors}));
  // đường dẫn /users server render profile để hiển thị thông tin của user.
  app.get('/users', isLoggedIn, function(req, res) { // vào đường dẫn /users,    
    connection.query("SELECT confirm FROM users WHERE username = ?",[req.user.username], function(err, rows) {
      if (rows[0].confirm == 'done'){
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

  // ????? input next là gì??, next chuyển sang middleware tiếp theo trong stack
function isLoggedIn(req, res, next) {
  // xác thực người dùng có đang đăng nhập hay k?
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
}