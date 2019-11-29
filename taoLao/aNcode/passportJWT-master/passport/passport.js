// config/passport.js

// load all the things we need
const passportJWT   = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;


// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/configDB');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        }, (req,username, password,done)=>{
            
        connection.query("SELECT * FROM users WHERE username = ?",[username], (err, rows) => {
            if (err)
                return done(err);
            if (rows.length) {
                return done('That username is already taken.', false);
            } else {
                // if there is no user with that username
                // create the user
                var newUserMysql = {
                    username: username,
                    password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                };
            
                var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";
        
                connection.query(insertQuery,[newUserMysql.username, newUserMysql.password], (err, rows) => {
                    if(err) return done(err);
                    newUserMysql.id = rows.insertId;
                    return done(null, newUserMysql);
                });
            }
        });
        })
);


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================


    passport.use(
        'local-signin',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        }, (req, username, password, done) => {

            connection.query("SELECT * FROM users WHERE username = ?",[username], (err, rows) => {
                
                if (err) () => done(err);

                if (!rows.length) () => done('No user found.', false);

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password)) () => done('password is wrong', false);
                
                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );


    passport.use(
        new JWTStrategy({
            jwtFromRequest: req => req.cookies.jwt,
            secretOrKey: "Nguyen123"
        },
        (jwtPayload, done) => {

            if (jwtPayload.expires > Date.now()) () => done('jwt expired');

            return done(null, jwtPayload);
        }
    ));
};
