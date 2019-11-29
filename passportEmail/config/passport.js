var localstragtegy = require('passport-local').Strategy;
var bodyparser = require('body-parser');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbConfig = require('./config');
var connection = mysql.createConnection(dbConfig.connect);
var uuid = require('uuid')
var nodemailer = require('nodemailer')

connection.query('USE ' + dbConfig.database);


module.exports = function(passport, port, app, errors) {
    
    //get input of form
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: false }));

     // used to serialize the user for the session
    passport.serializeUser(function(user, done) { // hàm này đc gọi khi xác thực t/công và ghi gt user vào ss
        done(null, user.id);  // ????
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {   //Thông tin đã lưu đại diện cho người dùng được lấy ra trong các request lần sau
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);  //???
        });
    });




     // =====================
    // LOCAL SIGNUP =========
    // ======================
   
    passport.use(
        'local-register',
        // console.log('register ne'),
        new localstragtegy({
            //????? không hiểu tại sao lại khởi tạo ntn // vì mặc định nó là vậy
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) {
            // console.log("check_username")
            
            

            // kiểm tra xem username đã được tạo trước đó chưa
            //?????? k hiểu các phần return, cú pháp, cái gì sẽ nhận phần return đó // phần autheticate sẽ nhận return để biết success or fail
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    console.log('That username is already taken')
                    errors.push({msg: "That username is already taken"})
                    return done(null, false);
                }
                else {
                    const linkConfirm = uuid()
                    app.get( `/${username}/${linkConfirm}`, (req, res) => {
                        connection.query("UPDATE users SET confirm = 'true' WHERE username = ?",[username])
                        res.redirect('/users')
                    })
                    const output = `
                                      <p>You have a new contact request</p>
                                      <h3>Hello. You have to confirm the acount </h3>
                                      <ul>  

                                      </ul>
                                      <p>Please click on this link to access your acount</p>
                                        <h1>http://localhost:${port}/${username}/${linkConfirm}</h1>
                                    `;
                    // console.log('xong output')
                    const transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'nguyenvanlongt2@gmail.com', // generated ethereal user
                            pass: '01665596604'  // generated ethereal password
                        },
                        tls:{
                          rejectUnauthorized:false
                        }
                      });
                    // console.log('xong createTransport')
                    const mailOptions = {
                        from: '"Nodemailer Contact" <nguyenvanlongt2@gmail.com>', // sender address
                        to: 'longvlxx99@gmail.com', // list of receivers
                        subject: 'Node Contact Request', // Subject line
                        text: 'Hello world?', // plain text body
                        html: output // html body
                    };
                    // console.log('send mail')
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log('loi roi', error);
                        }
                    
                    console.log('send mail success')})
                    const newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null), // mã hóa password
                        confirm: 'false'
                    };
                    

                    // add infor vô database
                    // console.log("add infor");
                    const insertQuery = "INSERT users (username, password, confirm) values (?,?,?)";
                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password, newUserMysql.confirm],function(err, rows) {
                        newUserMysql.id = rows.insertId;
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );


    // ===================
    // LOCAL LOGIN =======
    // ===================
  
    passport.use(
      'local-login',
      new localstragtegy({
          // ??? chưa hiểu khúc này có ý nghĩa gì???
          usernameField : 'username',
          passwordField : 'password',
          passReqToCallback : true 
      },
      function(req, username, password, done) { // callback với username và password đã điền để kiểm tra trong database
        // kiểm tra có tồn tại username trong database k
        connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
              if (err)
                  return done(err);
              if (!rows.length) {
                  errors.push({msg: 'Username not found'})
                  return done(null, false); // req.flash is the way to set flashdata using connect-flash
              }
              if (rows[0].confirm != 'true'){
                  errors.push({msg: 'Username chua confirm'})
                  console.log('chua confirm')
                  return done(null, false)
              }
              // ?????? kiểm tra password ( nhưng chưa hiểu cú pháp này)
              if (!bcrypt.compareSync(password, rows[0].password)){
                errors.push({msg: 'Wrong password'})
                return done(null, false); // create the loginMessage and save it to session as flashdata

              }
              // hoàn tất
                console.log('hoan tat')
                return done(null, rows[0]);

          });
      })
  );
};





