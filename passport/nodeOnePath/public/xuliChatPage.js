
var socket = io('http://localhost:3001')
socket.on('join-room-page', function(data){
    // $("#roomSpace").show()
    // $("#chatSpace").hide()
    $("#selectRoom").html("")
    data.forEach(r => {
        $("#selectRoom").append("<option value='" + r.nameRoom +"'>"+ r.nameRoom +"</option>")
        
    });
})
socket.on('new-room-was-created', function(data){
    // $("#roomSpace").hide()
    // $("#chatSpace").show()
    $("#selectRoom").html("")
    data.forEach(r => {
        $("#selectRoom").append("<option value='" + r.nameRoom +"'>"+ r.nameRoom +"</option>")
        
    });
})

socket.on('server-send-text-to-clients', function(data){
    // $("#roomSpace").hide()
    // $("#chatSpace").show()
    console.log("nhan messages from server")
    console.log("alo")
    $("#textChat").html("")
    data.forEach(r => {
        // $("#textChat").append("<p>" + r.username + ": " + r.text + "</p>")
        $("#textChat").append("<div class='containerChat'>\
        <p>" + r.username + ": " + r.text + "</p>\
        <span class='time-right'>" + r.date + "</span>\
      </div>")
    });
})

$(document).ready(function(){
    // $("#roomSpace").show()
    // $("#chatSpace").hide()
    $("#sendText").click(function(req, res){
        console.log("client-send-text-chat, ahihi")
        var d = Date(Date.now()).toString().slice(0,25)

        socket.emit('client-send-text-chat', {user: document.getElementById("usernameChat").innerHTML, chat: $("#inputText").val(), date: d})

    })
    $("#btnCreateRoom").click(function(req, res){
        socket.emit('client-send-create-room', {roomName: $("#createRoom").val(), user: document.getElementById("usernameChat").innerHTML})
    })
    $("#btnchooseRoom").click(function(req, res){
        socket.emit('client-send-create-room', {roomName: document.getElementById('selectRoom').value, user: document.getElementById("usernameChat").innerHTML})
    })
})