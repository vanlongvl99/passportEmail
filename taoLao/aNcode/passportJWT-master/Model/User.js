// load up the user model
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const dbconfig = require('../config/configDB');
const connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = (User) => {
    const Signup = (username, password, done) => {

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
    };

    const Signin = (username, password, done) => { // callback with email and password from our form

        connection.query("SELECT * FROM users WHERE username = ?",[username], (err, rows) => {
            if (err)
                return done(err);
            if (!rows.length) {
                return done('No user found.', false);
            }

            // if the user is found but the password is wrong
            if (!bcrypt.compareSync(password, rows[0].password))
                return done('password is wrong', false);
            // all is well, return successful user
            return done(null, rows[0]);
        
        });
    };
};
