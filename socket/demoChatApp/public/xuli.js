var socket = io("http://localhost:2004");


// socket.on('user-was-taken', function(data){
    // alert(`user ${data} was taken`)
// })
// socket.on('register-succeed', function(data){
    // $("#currentUser").html(data)
    // $("#chatForm").show()
    // $("loginForm").hide()
// })
// socket.on('server-send-list-user', function(data){
    // data.forEach(eachUser) => {
        // $("#boxContent").append("<div id = user>" + eachUser + "</div>")
    // });
// })

$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();
    // $("#btnRegister").click(function(){
        // socket.emit('client-send-register', $("#txtUsername").val())
    // })
})