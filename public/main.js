var port = 3001; 
var socket = io.connect('http://localhost:' + port); 

socket.on('userName', function(userName){ //
    console.log('You\'r username is => ' + userName); 
    $('textarea').val($('textarea').val() + 'You\'r username => ' + userName + '\n'); 
});

socket.on('newUser', function(userName){ 
    console.log('New user has been connected to chat | ' + userName);
    $('textarea').val($('textarea').val() + userName + ' connected!\n'); 
});

$(document).on('click', 'button', function(){
    var message = $('input').val(); 
    socket.emit('message', message); 
    $('input').val(null);
});


socket.on('messageToClients', function(msg, name){
    console.log(name + ' | => ' + msg);
    $('textarea').val($('textarea').val() + name + ' : '+ msg +'\n'); 
});