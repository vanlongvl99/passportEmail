const express = require('express')
const app = express()
app.use(express.static("public"))
const port = 3008
app.set("view engine", 'ejs')
app.set("views", "./views")

const server = require("http").Server(app)
const io = require('socket.io')(server)
server.listen(port)

var mangUsers=[];


io.on("connection", function(socket){  // socket là 1 object, ta đc phát
    console.log("co nguoi vua ket noi: " + socket.id)
    socket.on('client-send-username', function(data){   // server listen emit register from client
        console.log('username la: ' + data)
        if(mangUsers.indexOf(data)> -1){
            socket.emit("server-send-register-fail");  // register fail, server emit to client
        }else{
            mangUsers.push(data);
            socket.Username = data // mình tự tạo ra 1 thuộc tính của socket
            socket.emit("server-send-register-succeed", data); //register succeed, server emit to client
            io.sockets.emit("server-send-list-users", mangUsers); // server send list to all clients
        
        }
    })
    socket.on("logout", function(){     // server listen logout from client
        mangUsers.splice(mangUsers.indexOf(socket.Username), 1); // clear user
        // socket.emit('') 
        socket.broadcast.emit('server-remove-someclient', mangUsers)
        // socket.broadcast.emit("server-send-danhsach-Users",mangUsers);

    })
    socket.on('user-send-message', function(data){
        console.log(data)
        io.sockets.emit('server-send-message',{un: socket.Username, nd: data})
    })

})

app.get('/', function(req, res){
    res.render('trangchu')
})

console.log(`server listening port: ${port}`)
