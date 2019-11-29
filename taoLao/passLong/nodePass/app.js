const express = require('express');
const expressLayOut = require('express-ejs-layouts');
const mysql = require('mysql');
const app = express();
const bodyparser = require('body-parser');

//DB config
// const db = require('./config/config');


// connect to myslq
// mysql.createConnection(db.connect);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));



// ejs
app.use(expressLayOut);
app.set('view engine','ejs');


// routes
app.use('/', require('./routes/index'))   //??? tại đường dẫn / chạy file index
app.use('/users', require('./routes/users'))  // mở thêm đường dẫn user chạy file user



// get data form
// app.post('/users/register', function(req, res) {
    // var name = req.body.name;
    // res.send('<h1>Hello</h1> '+name);
    // console.log(name)
// });



const port = process.env.port || 5007;

app.listen(port, console.log("server started on port "));