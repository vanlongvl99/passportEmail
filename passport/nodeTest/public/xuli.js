var socket = io('http://localhost:3003/users')

$(document).ready(function(){
    $("#btnRoom1").click(function(){
        socket.emit('client-send-create-room', $("#createRoom").val())
    })
})