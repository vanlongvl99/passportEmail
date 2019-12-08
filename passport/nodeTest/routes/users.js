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

  //login page
  app.get('/users/login', function(req, res) {
    // xác thực client gửi yêu cầu tới có đang đăng nhập hay k?
    // nếu có thì dẫn đến /users
    if (req.isAuthenticated()) {
          connection.query("SELECT confirm FROM users WHERE username = ?",[req.user.username], function(err, rows) {
            if (rows[0].confirm == 'true')
              res.redirect('/users');
            else{
              errors.push({msg: 'User chua confirm'})
              res.render('login',{errors});
            }   
          })
        }
    else{
      res.render('login',{errors});
    }
  });
  // after register get link /users/confirm to notice verify email
  app.get('/users/confirm', (req, res) => {
    res.render('confirmEmail')
  })
  // get logout and redirect to /users/login
  app.get('/users/logout', function(req, res) {
    req.logout();
    res.redirect('/users/login');
});

  // register page   
  app.get('/users/register', function(req, res) {
    // render the page and pass in any flash data if it exists
    if (req.isAuthenticated()){
      connection.query("SELECT confirm FROM users WHERE username = ?",[req.user.username], function(err, rows) {
        if(!rows.length){
          res.render('welcome')
        }
        if (rows[0].confirm == 'true'){
          res.redirect('/users');
        }else{
          // req.logout()
          console.log('get register again')
          res.render('register', {errors});
        }
      })
    }
    else{
      console.log('chua authe')
      res.render('register',{errors});
    }   
  });

  //change acount
  app.get('/users/changePassword', (req, res) => {
    res.render('changeAcount', {errors})
  })
  app.get('/users/getAcount', (req, res) => {
    res.render('getAcount', {errors})
  })
// process the login form
  app.post('/users/login', passport.authenticate('local-login', {
    //??????? khúc này vẫn còn thắc mắc cách thức chạy, trả về ntn, đặt tên successRedirect.... 
  successRedirect : '/users', // khi đăng nhập thành công sẽ dẫn đến đường dẫn /users nơi hiển thị info đã login
  failureRedirect : '/users/login', // khi bị lỗi sẽ back lại trang login ()
  }),function(req, res){
    // ??????? hàm này không hiểu
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
  });


  
// =====================================
    // register ==============================
    // =====================================
    // xác thực các thông tin đăng nhập 
  app.post('/users/register', passport.authenticate('local-register', {
      successRedirect : '/users/confirm', // giống trên
      failureRedirect : '/users/register', // giống trên 
  }));

  // xác nhận đổi mật khẩu
  app.post('/users/changePassword', function(req, res){
    console.log('hello change password')
    const {username, oldPassword, newPassword} = req.body
    connection.query('select *from users where username =?', [username], function(err, rows){
      if (err){
        res.send(err)
      }
      if (!rows.length){
        console.log('user not found')
        errors.push({msg: 'user not found'})
        res.render('changeAcount', {errors})
      }else{
        console.log(rows[0].password)
        console.log(oldPassword)
        if (!bcrypt.compareSync(oldPassword, rows[0].password)){
          console.log('wrong password')
          errors.push({msg: 'wrong password'})
          res.render('changeAcount', {errors})
        }else{
          console.log('đổi mật khẩu thành công')
          console.log(`oldpassword: ${oldPassword}, newPassword: ${newPassword}`)
          var changePass = bcrypt.hashSync(newPassword, null, null)
          connection.query(`UPDATE users SET password = '${changePass}' WHERE username = ?`, [username])
          req.logout()
          errors.push({msg: 'change password success'})
          console.log('change password success')
          res.redirect('/users/login')
        }

      }
    })
  })
  app.post('/users/getAcount', (req, res) => {
    const {username} = req.body
    console.log(username)
    connection.query('select *from users where username = ?', [username], function(err, rows){
      if (err){
        res.send(err)
      }
      if (!rows.length){
        console.log('username not found')
        errors.push({msg: 'username not found'})
        res.redirect('/users/getAcount')
      }else{

        const codeSend = Math.floor(Math.random()*899999) + 100000
        const output = `
        <p>You have a new contact request</p>
        <h3>Hello. Your code is ${codeSend} </h3>`
        
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'nguyenvanlongt2@gmail.com',
            pass: '01665596604'
          },
          tls: {
            rejectUnauthorrized: false
          }
        })
        const mailOptions = {
          from: '"Nodemailer code" <nguyenvanlongt2@gmail.com',
          // to: `${username}`,
          to: 'longvlxx99@gmail.com',
          subject: 'Node give you the code', // Subject line
          text: 'Hello world?', // plain text body
          html: output
        }
        transporter.sendMail(mailOptions, (error, info) =>{
          if (error){
            res.send(error)
          }
        })
        console.log('send code success')
        app.get('/users/getAcount/code', (req, res) => {
          res.render('code', {errors})
        })
        app.post('/users/getAcount/code', (req, res) => {
          const {codeConfirm, newPassword} = req.body
          if (codeConfirm != codeSend){
            console.log("code wrong")
            errors.push({msg: 'code wrong'})
            res.redirect('/users/getAcount/code')
          }else{
            passChange = bcrypt.hashSync(newPassword, null, null)
            connection.query(`update users set password = '${passChange}' where username = ?`, [username])
            errors.push({msg: 'get acount success'})
            res.redirect('/users/login')
          }
        })
        console.log('get link code')
        res.redirect('/users/getAcount/code')
      }
    })
  })

  // ????? input next là gì??, next chuyển sang middleware tiếp theo trong stack
function isLoggedIn(req, res, next) {
  // xác thực người dùng có đang đăng nhập hay k?
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
}