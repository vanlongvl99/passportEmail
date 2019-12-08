# Passport-local DOC

# overview
1.  [Dependencies](#dependencies)
2.  [Passportjs](#passportjs)
3.  [Setup and run](#setup-and-run)
4. [Nodemailer](#Nodemailer)

## Dependencies
[Top](#overview)

### Một số dependencies quan trọng
   - [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs): Hash password
   - [ejs](https://ejs.co/): Template nhúng JS vào html chạy cho ngầu
   - [joi](https://github.com/hapijs/joi): Kiểm định dữ liệu trước khi query hay insert DB, tuy nhiên chưa sài :v 
   - [uuid](https://www.npmjs.com/package/uuid): Tạo ID người dùng

## Passportjs
[Top](#overview)

Passport một trong những module phổ biến nhất của Nodejs hỗ trợ trong việc xác thực người dùng. Passport có rất nhiều kiểu chứng thực ví dụ như chứng thực qua tài khoản Local, Twitter, Facebook, Google,… Tuy nhiên một điều đáng buồn nhất là vẫn chưa có xác thực tài khoản Porn hub, xvideos,...
Phần này giới thiệu về Passport-local (Truy vấn và so sánh trong CSDL). 

### Các chức năng chính của Passport
````
    .initialize : middleware được gọi ở từng request, kiểm tra session lấy ra passport.user nếu chưa có thì tạo rỗng.
    .passport.session: middleware sử dụng kịch bản Passport , sử dụng session lấy thông tin user rồi gắn vào req.user.
    .authenticate: Sau khi người dùng gửi yêu cầu đăng nhập, hàm này được gọi và bắt đầu chứng thực.
    .serializeUser: hàm này được gọi khi xác thực thành công và ghi một giá trị đại diện cho người người dùng vào trong Session.
    .deserializeUser:  Thông tin đã lưu đại diện cho người dùng được lấy ra trong các request lần sau.
````

Với từng yêu cầu của người dùng Passport hỡ trợ thêm 4 hàm 

````
    req.login() : Đăng nhập 
    req.logout() : Đăng xuất tài khoản người dùng.
    req.isAuthenticated() : Xác thực người dùng gửi yêu cầu tới có đang đăng nhập hay không, nếu có trả về “true” nếu không là “false”.
    req.isUnauthenticated() : Xác thực người dùng gửi yêu cầu tới có đang đăng nhập hay không. Nếu không trả về “true” nếu có trả về “false”.
````
### Hoạt động của passport với kiểu chứng thực local


Khi thực hiện gửi thông tin đăng nhập tại đường dẫn, thì hàm Passport.authenticate được thực hiện và được khai báo sử dụng xác thực kiểu “local” – với username và password người dùng đã đăng ký.

````
    // process the login form
    app.post('/signin', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/signin', // redirect back to the signin page if there is an error
        }),function(req, res){
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
    });
````

Và để có phương thức xác thực thông tin người dùng gửi đến thì hàm Passport.use(new LocalStrategy … ) được thực thi. Tại đây ta thực hiện truy vấn cơ sở dữ liệu và so sánh thông tin đăng nhập của người dùng có đúng hay không.

````
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
    ````
Và tại các lần gửi yêu cầu khác, trình duyệt sẽ gửi giá trị cokie hồi nãy đã ghi vào đại diện cho người dùng và sẽ được lấy ra bởi hàm .deserializeUser(). Các yêu cầu người dùng gửi đến lần sau sẽ không cần phải thực hiện đăng nhập nữa.

Như vậy giá trị đại diện cho người dùng phải được lưu trữ ở cả hai nơi server lẫn client (ở đây client được lưu ở cookie cho dễ test :v). Điều này rất bất lợi, không thể thực thi trên các dịch vụ không máy chủ (không thể lưu trữ session). Nên một hướng khác là sử dụng JWT (Json Web Token).

##### Thiết lập express-session để lưu trữ giá trị đại diện cho người dùng

````
app.use(session({
    secret: 'Nguyen_Dep_Trai',
    resave: true,
    saveUninitialized: true
} )); // session secret
````

## Setup and run
[Top](#overview)
### Bước 1: Vào sửa lại các thông tin trong file config.js

````
module.exports = {
    'connection': {
        'host': 'localhost',
        'user': 'root',
        'password': 'yourpassword'
    },
	'database': 'confirmEmail',
    'users_table': 'users'
};
```` 

### Bước 2: Tạo cơ sở dữ liệu

    ````
    cd passport-local-app
    cd CreateDB
    node CreateTable.js
    ````
### Bước 3: Install and run

    ````
    cd ..
    npm install
    npm start
    ````
## Nodemailer
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