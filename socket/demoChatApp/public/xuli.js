var socket = io("http://localhost:3008")


// client listen notice register fail
socket.on("server-send-register-fail", function(){
    alert("Sai Username (co nguoi da dang ki roi!!!)");
  });

  // client listen notice register succeed
socket.on('server-send-register-succeed', function(data){
  $("#currentUser").html(data); 
  $("#loginForm").hide()
  $("#chatForm").show()
})

// client listen notice another client register succeed
socket.on('server-send-list-users', function(data){
  $("#boxContent").html('') // cho thèn box rỗng ruột trc
  data.forEach(function(i){
    $("#boxContent").append("<div class='user'>" + i + "</div>");
  });
})
socket.on('server-remove-someclient', function(data){
  $("#boxContent").html('') // cho thèn box rỗng ruột trc
  data.forEach(function(i){
    $("#boxContent").append("<div class='user'>" + i + "</div>");

  })
})

socket.on('server-send-message', function(data){
  $("#listMessages").append("<div class = 'msg' >"+ data.un + ": " + data.nd +"</div>" )
})


$(document).ready(function(){
    $("#loginForm").show()
    $("#chatForm").hide()
    $("#btnRegister").click(function(){
        socket.emit("client-send-username", $("#txtUsername").val());
      });

    $("#btnLogout").click(function(){
      socket.emit("logout");
      $("#chatForm").hide();
      $("#loginForm").show();
    });
    $("#btnSendMessage").click(function(){
      socket.emit("user-send-message", $("#txtMessage").val())
    })
    

})