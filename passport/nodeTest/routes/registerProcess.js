const mysql = require('mysql');
const dbConfig = require('../config/config');
const connection = mysql.createConnection(dbConfig.connect);
connection.query('USE ' + dbConfig.database);
module.exports = function(app, passport, errors){
    // register page   
  app.get('/users/register', function(req, res) {
    // render the page and pass in any flash data if it exists
    if (req.isAuthenticated()){
      connection.query("SELECT confirm FROM users WHERE username = ?",[req.user.username], function(err, rows) {
        if(!rows.length){
          res.render('welcome')
        }
        if (rows[0].confirm == 'done'){
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

  // xác thực các thông tin đăng nhập 
  app.post('/users/register', passport.authenticate('local-register', {
    successRedirect : '/users/confirm', // giống trên
    failureRedirect : '/users/register', // giống trên 
}));

}