var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
var port = '3004'
server.listen(2001);

io.on("connection", function(socket){

  console.log("Co nguoi ket noi:" + socket.id);

  socket.on('client-send-mau', (data)=>{
    console.log('client click mau: ' + data)
})

});


app.get("/", function(req, res){
  res.render("trangchu",{port});
});
