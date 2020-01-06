var socket = io('http://localhost:3000/users')

socket.on('join-room-page', function(data){
    $("#selectRoom").html("")
    data.forEach(r => {
        $("#selectRoom").append("<option value='" + r.nameRoom +"'>"+ r.nameRoom +"</option>")
        
    });
})
socket.on('new-room-was-created', function(data){
    $("#selectRoom").html("")
    data.forEach(r => {
        $("#selectRoom").append("<option value='" + r.nameRoom +"'>"+ r.nameRoom +"</option>")
        
    });
})

$(document).ready(function(){
    $("#btnCreateRoom").click(function(req, res){
        socket.emit('client-send-create-room', {roomName: $("#createRoom").val(), user: document.getElementById("usernameChat").innerHTML})
    })
    $("#btnchooseRoom").click(function(req, res){
        socket.emit('client-send-create-room', {roomName: document.getElementById('selectRoom').value, user: document.getElementById("usernameChat").innerHTML})
    })
    

})