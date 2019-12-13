

module.exports = function(app, passport, errors){
    //login page
  app.get('/users/login', function(req, res) {
    // xác thực client gửi yêu cầu tới có đang đăng nhập hay k?
    // nếu có thì dẫn đến /users
    if (req.isAuthenticated()) {
        console.log('da authen before')
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
}