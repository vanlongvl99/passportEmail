const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static("puclic"))
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', function(req, res){
    res.render('trangChu')
})
const port = 2002
var currentRoom = ''
app.listen(port, console.log(`server was listening port: ${port}`))
io.on("connection", function(socket){
    console.log('hello socket')
    socket.on('client-send-create-room', function(data){
        console.log("hello user socket")
        console.log('vo listRoom r ne')
        socket.emit('join-room-page',[{nameRoom: 'a'},{nameRoom: 'b'}])
    })
    socket.on('client-send-create-room', function(data){
        console.log("hello tao room ne")
        console.log('client gui data ne: ' + data.roomName)
        console.log('client gui data ne: ' + data.user)
        socket.join(data.roomName)
        socket.Room = data.roomName
        currentRoom = data.roomName
        io.sockets.emit('new-room-was-created',rows)
        socket.on('client-send-text-chat', function(data){
            console.log('chat send data')
            console.log(data.user + ": " + data.chat)
            console.log(`current room ne: ${currentRoom}`)
                                // io.sockets.emit('server-send-text-to-clients',rows)
            io.sockets.in(socket.Room).emit('server-send-text-to-clients',[{username: 'long', text: a}])
                // io.sockets.to(`'${socket.Room}'`).emit('server-send-text-to-clients',rows)
                // io.to(`'${socket.Room}'`).emit('server-send-text-to-clients',rows)
                // io.in(`'${socket.Room}'`).emit('server-send-text-to-clients',rows)
                // io.of('/roomChat').to(socket.Room).emit('server-send-text-to-clients',rows);
        })
    })
})