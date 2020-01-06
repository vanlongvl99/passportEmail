const express = require('express');
const session = require('express-session');
const expressLayOut = require('express-ejs-layouts');
const mysql = require('mysql');
const dbconfig = require("./config/config")
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const server = require('http').Server(app)
const io = require("socket.io")(server)

const connection = mysql.createConnection(dbconfig.connect)
connection.query("use " + dbconfig.database)

var bodyparser = require('body-parser');
var port = process.env.port || 3000 ;
var errors = []


require('./config/passport')(passport, port, app, errors);
app.use(express.static("public"))
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




server.listen(port, console.log(`server started on port: ${port}`))
var currentRoom = ''
io.of('/users')    
.on("connection", function(socket){
    console.log("hello user socket")
    connection.query('select *from listRoom;', function(err, rows){
        console.log('vo listRoom r ne')
        console.log(rows)
        socket.emit('join-room-page',rows)
    })
    socket.on('client-send-create-room', function(data){
        console.log("hello tao room ne")
        console.log('client gui data ne: ' + data.roomName)
        console.log('client gui data ne: ' + data.user)
        socket.join(data.roomName)
        socket.Room = data.roomName
        currentRoom = data.roomName
        connection.query('select * from listRoom where nameRoom = ?;', [data.roomName], function(err, rows){
            console.log('vo database dc roi')
            if (err){
                console.log(err)
            }
            console.log(`rows ne: ${rows}`)
            console.log(rows.length)
            if (!rows.length){
                // socket.broadcast.emit('new-room-was-created',[data.roomName])
                console.log('phong chua dc tao truoc do')
                connection.query('insert listRoom (nameRoom) values (?) ;', [data.roomName])
                connection.query('select *from listRoom;', function(err, rows){
                    console.log('vo listRoom r ne')
                    console.log(rows)
                    socket.broadcast.emit('new-room-was-created',rows)
                })
                connection.query('create table '+data.roomName+' (`username` CHAR(60) NOT NULL, \
                                                                 `text` CHAR(60) NOT NULL) ;')
            }else{
                console.log("room da ton tai")
            }
        })
    })
})

// var chatSocket = io
io.of("/roomChat")
.on("connection", function(socket){
    console.log('hello chat socket')
    socket.on('client-send-text-chat', function(data){
        console.log('chat send data')
        console.log(data.user + ": " + data.chat)
        console.log(`current room ne: ${currentRoom}`)
        connection.query(`insert ${currentRoom} (username, text) values (?, ?) ;`, [data.user, data.chat])
        connection.query(`select * from ${currentRoom} ;`, function(err, rows){
            if (err){
                console.log(err)
            }
            console.log('vo dc database')
            console.log(JSON.stringify(rows))
            socket.broadcast.emit('server-send-text-to-clients',rows)
            io.sockets.emit('server-send-text-to-clients',rows)
            io.sockets.emit('server-send-text-to-clients',rows)
            io.of("/roomChat").to(currentRoom).emit('server-send-text-to-clients',rows)
            // ioChat.in(currentRoom).emit('server-send-text-to-clients',rows)
        })
    })
})