const express = require('express');

const router = express.Router();

// login page

router.get('/login', (req, res) => res.render('login'));  // tai / mở 1 đường dẫn login thực hiện function,render trả về file cho client

// register page

router.get('/register', (req, res) => res.render("register"))  // tại / mở 1 đường dẫn register

// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================


router.post('/register', (req, res) => {
    // const { name, email, password, password2 } = req.body;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;


    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (errors.length > 0) {
        console.log(errors)
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    // }
    } else {
     
        console.log(name, email, password);
        new LocalStrategy({
        //   **** */  by default, local strategy uses username and password, we will override with email
            nameField: 'name',
            emailField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, name, email, password, done) {
            console.log('compare to add into database');
        //    ** find a user whose email is the same as the forms email
        //    ** we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM users WHERE email = ?",[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
        //  **           if there is no user with that email
        //    **         create the user
                    var newUserMysql = {
                        name: name,
                        email: email,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };
                    
                    console.log(newUserMysql);
                // **    add infor vô database
                    var insertQuery = "INSERT INTO users ( name, email, password ) values (?,?,?)";

                    connection.query(insertQuery,[newUserMysql.name], [newUserMysql.email, newUserMysql.password],function(err, rows) {
                        newUserMysql.id = rows.insertId;
                        return done(null, newUserMysql);
                    });
                }
            });
        })
        console.log('registed')
        res.render('login');
  }
});
module.exports = router;