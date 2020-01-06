
var socket = io("http://localhost:2004");

socket.on('server-send-listRoom', function(data){
    $("#listRoom").html("")
    // data.map(function(r){
    data.forEach(r => {
      $("#listRoom").append("<h4 id='room'>" + r + "</h4>");
    });
})
socket.on('server-send-currentRoom', function(data){
    $("#currentRoom").html(data)
})

socket.on('server-chat-room', function(data){
  $("#contentChat").append("<div>" + data + "</div>");

})
$(document).ready(function(){
  $("#btnTaoRoom").click(function(){
    socket.emit("tao-room", $("#txtRoom").val());
  });
  $("#btnEachChat").click(function(){
    socket.emit('client-sent-chat', $("#eachChat").val())
  })
})
