const express = require('express');
const session = require('express-session');
const expressLayOut = require('express-ejs-layouts');
const mysql = require('mysql');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const bodyparser = require('body-parser');
const port = process.env.port || 2000 ;
var errors = []
require('./config/passport')(passport, port, app, errors);

app.use(logger('dev'));

//get input of form
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(cookieParser());



// ejs
app.use(expressLayOut);
app.set('view engine','ejs');


app.use(session({
    secret: 'NguyenVanLong',
    resave: true,
    saveUninitialized: true
} )); // session secretconst

//passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// routes
require('./routes/users')(app, passport, errors)



app.listen(port, console.log(`Server started on port: ${port}`));