const express = require('express')
const app = express()
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.set("views", "./views")
const server = require('http').Server(app)
const io = require("socket.io")(server)
var port = 2004
server.listen(port)
console.log('server listening: ' + port)


var mangRoom = []
io.on("connection", function(socket){
    console.log("co nguoi ket noi: " + socket.id)
    socket.on("tao-room", function(data){
        console.log(socket.adapter.rooms)

        // console.log(data)
        socket.join(data)
        console.log(socket)
        socket.Room = data
        mangRoom.push(socket.Room)
        // console.log(mangRoom)
        io.sockets.emit('server-send-listRoom', mangRoom)
        socket.emit('server-send-currentRoom', socket.Room)
    
    })
    socket.on('client-sent-chat', function(data){
        io.in(socket.Room).clients((err, listClients)=>{
            if (err) throw err
            console.log(`list clients in room ${socket.Room} ne: ${listClients}`)
            
        })
        console.log(data)
        io.sockets.in(socket.Room).emit('server-chat-room',data)
    })


})



app.get('/', function(req, res){
    res.render('trangchu')
})
// 