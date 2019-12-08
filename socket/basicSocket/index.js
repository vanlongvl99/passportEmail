var express = require('express')


// gửi lại cho all io.sockets.emit
// gửi lại cho 1 mình nó socket.emit
// gửi lại cho all trừ nó socket.broadcast.emit


var app = express()
app.use(express.static("public"))
var port = 3008
app.set("view engine", 'ejs')
app.set("views", "./views")

var server = require("http").Server(app)
var io = require('socket.io')(server)
server.listen(port)
io.on("connection", function(socket){
    console.log("co nguoi ket noi: " + socket.id)
    socket.on("client-send-mau", function(data){
        console.log("nhan data: " + data)
        io.sockets.emit("server-send-mau", data)
    })
})

app.get('/', function(req, res){
    res.render('trangchu')
})

console.log(`server listening port: ${port}`)
