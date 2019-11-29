

// ?????????????????
// em chưa hiểu khúc nào khúc nào thông tin đăng ký của mình được lưu vào trong session và cookie
/// ????

const mysql = require('mysql');
const dbConfig = require('../config/config');
// 
const connection = mysql.createConnection(dbConfig.connect);
// 
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
        console.log("login meo dc")
        res.redirect('/users/register');
      }
    })
  });
  
  
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
      // console.log('login......')
      res.render('login',{errors});

    }

});

  app.get('/users/confirm', (req, res) => {
    res.render('confirmEmail')
  })

  app.get('/users/logout', function(req, res) {
    req.logout();
    res.redirect('/users/login');
});

  // register page   
  app.get('/users/register', function(req, res) {
    // render the page and pass in any flash data if it exists
    console.log('vcl')
    if (req.isAuthenticated()){
      connection.query("SELECT confirm FROM users WHERE username = ?",[req.user.username], function(err, rows) {
        if(!rows.length){
          res.render('welcome')
        }
        if (rows[0].confirm == 'true'){
          res.redirect('/users');
        }else{
          req.logout()
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


  // ????? input next là gì??, next chuyển sang middleware tiếp theo trong stack
function isLoggedIn(req, res, next) {
  // xác thực người dùng có đang đăng nhập hay k?
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
}