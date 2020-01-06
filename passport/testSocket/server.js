const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const layouts = require('express-ejs-layouts')
app.set("views", "./views")
app.set('view engine', 'ejs')
port = process.env.port || 3003
app.use(express.static('public'))
app.get('/users', function(req, res){
    res.render('users')
})
server.listen(port, console.log(`server was listening port: ${port}`))

var user = io
    .of('/users')
    .on("connection", function(socket){
        console.log('socket hello users')
        socket.on("user-client-send", function(data){
            console.log(hello)
            console.log('socket: ' + data)
        })
    })