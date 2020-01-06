
var socket = io('http://localhost:3000/roomChat')
socket.on('server-send-text-to-clients', function(data){
    console.log("nhan messages from server")
    console.log("alo")
    $("#textChat").html("")
    data.forEach(r => {
        $("#textChat").append("<p>" + r.username + ": " + r.text + "</p>")
    });
})

$(document).ready(function(){
    $("#sendText").click(function(req, res){
        console.log("client-send-text-chat, ahihi")
        socket.emit('client-send-text-chat', {user: document.getElementById("usernameChat").innerHTML, chat: $("#inputText").val()})

    })
})