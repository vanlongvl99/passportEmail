const mysql = require('mysql');
const dbConfig = require('../config/config');
const bcrypt = require('bcrypt-nodejs');
const connection = mysql.createConnection(dbConfig.connect);
connection.query('USE ' + dbConfig.database);

module.exports = function(app, errors, username){
  app.get('/users/getAcount/code', (req, res) => {
      res.render('code', {errors})
  })
  app.post('/users/getAcount/code', (req, res) => {
    let {codeConfirm, newPassword} = req.body
    connection.query('select code from users where username = ?',[username], function(err, rows){
      if (err) {
        res.send(err)
      }else{
        if (rows[0].code == codeConfirm){
          passChange = bcrypt.hashSync(newPassword, null, null)
          connection.query(`update users set password = '${passChange}' where username = ?`, [username])
          errors.push({msg: 'get acount success'})
          console.log('get acount success')
          res.redirect('/')
        }else{
          console.log("code wrong")
          errors.push({msg: 'code wrong'})
        res.redirect('/users/getAcount/code')
        }
      }
    })
  })
}