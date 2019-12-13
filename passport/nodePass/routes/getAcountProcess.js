const mysql = require('mysql');
const dbConfig = require('../config/config');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer')

const connection = mysql.createConnection(dbConfig.connect);
connection.query('USE ' + dbConfig.database);

module.exports = function(app, errors, passport){
    app.get('/users/getAcount', (req, res) => {
        res.render('getAcount', {errors})
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
    
            var codeSend = Math.floor(Math.random()*899999) + 100000
            console.log(`codeSend dau tien ne: ${codeSend}`)
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
            require('./getAcountCodeProcess')(app, errors, codeSend, username)
            console.log('get link code')
            res.redirect('/users/getAcount/code')
          }
        })
    })



}