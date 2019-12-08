const express = require('express')
const app = express()

app.use(express.static("public"))
app.set('view engine', 'ejs')  // set view engine sư dụng ejs
app.set('views','./views')  // set 1 biến views gọi về ./views

const server = require('http').Server(app)  // dựng server từ thư viện http
const io = require('socket.io')(server)

const port = 2004
console.log(`server's listening port: ${port}`)
app.listen(port)

mangUser = []

io.on("connection", function(socket){
    console.log("Co nguoi ket noi " + socket.id);
    socket.on('client-send-username', function(data){
        if(mangUser.indexOf(data) > -1){
            socket.emit('username-was-taken', data)
        }else{
            socket.emit('register-succeed', data)
            io.sockets.emit('server-send-list-user', mangUser)
        }



    })
})


app.get('/', function(req, res){
    res.render('trangchu')
})



