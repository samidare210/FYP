const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const NodeWebcam = require('node-webcam');
const Webcam = NodeWebcam.create();

Webcam.capture('test_picture', function(err, data) {
    io.emit('stream', data);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });

    socket.on('stream', function(data) {
        socket.broadcast.emit('stream', data);
    });
});

server.listen(3003, function() {
    console.log('Sever running...');
});