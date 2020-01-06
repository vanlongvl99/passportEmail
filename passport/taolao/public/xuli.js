
var socket = io('http://localhost:2002')
socket.on('join-room-page', function(data){
    $("#chatSpace").show()
    $("#selectRoom").html("")
    data.forEach(r => {
        $("#selectRoom").append("<option value='" + r.nameRoom +"'>"+ r.nameRoom +"</option>")
        
    });
})
socket.on('new-room-was-created', function(data){
    $("#chatSpace").show()
    $("#selectRoom").html("")
    data.forEach(r => {
        $("#selectRoom").append("<option value='" + r.nameRoom +"'>"+ r.nameRoom +"</option>")
        
    });
})

socket.on('server-send-text-to-clients', function(data){
    $("#chatSpace").show()
    console.log("nhan messages from server")
    console.log("alo")
    $("#textChat").html("")
    data.forEach(r => {
        $("#textChat").append("<p>" + r.username + ": " + r.text + "</p>")
    });
})

$(document).ready(function(){
    $("#chatSpace").hide()
    $("#roomSpace").show()
    $("#sendText").click(function(req, res){
        console.log("client-send-text-chat, ahihi")
        socket.emit('client-send-text-chat', {user: document.getElementById("usernameChat").innerHTML, chat: $("#inputText").val()})

    })
    $("#btnCreateRoom").click(function(req, res){
        socket.emit('client-send-create-room', {roomName: $("#createRoom").val(), user: document.getElementById("usernameChat").innerHTML})
    })
    $("#btnchooseRoom").click(function(req, res){
        socket.emit('client-send-create-room', {roomName: document.getElementById('selectRoom').value, user: document.getElementById("usernameChat").innerHTML})
    })
})