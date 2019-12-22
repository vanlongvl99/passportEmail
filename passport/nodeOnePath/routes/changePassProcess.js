const mysql = require('mysql');
const dbConfig = require('../config/config');
const connection = mysql.createConnection(dbConfig.connect);
const bcrypt = require('bcrypt-nodejs');

connection.query('USE ' + dbConfig.database);

module.exports = function(app, errors){
    //change acount
  app.get('/users/changePassword', (req, res) => {
    res.render('changeAcount', {errors})
  })

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
}