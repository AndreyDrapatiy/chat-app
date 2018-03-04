var express = require('express'); 
var app = express();
var server = require('http').Server(app); 
var io = require('socket.io')(server); 
var log4js = require('log4js'); 
var logger = log4js.getLogger(); 

var port = 3001;

logger.debug('Script has been started...');

server.listen(port);

app.use(express.static(__dirname + '/public')); 

io.on('connection', function (socket) { 
    var name = 'U' + (socket.id).toString().substr(1,4);
    socket.broadcast.emit('newUser', name); 
    socket.emit('userName', name); 
    logger.info(name + ' connected to chat!'); 
});

io.on('connection', function (socket) {
    var name = 'U' + (socket.id).toString().substr(1,4);
    socket.broadcast.emit('newUser', name);

    logger.info(name + ' connected to chat!');
    socket.emit('userName', name);
   

    socket.on('message', function(msg){ 
        logger.warn('-----------');
        logger.warn('User: ' + name + ' | Message: ' + msg);
        logger.warn('====> Sending message to other chaters...');
        io.sockets.emit('messageToClients', msg, name); 
    });
});

