const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdin,
    terminal: false
})

var port = 1234;
var users = [{username: 'UserTEST', active: false}];
var userCounter = 0;

io.on('connection', (socket) => {
    userCounter++;
    var username = `User${userCounter}`;

    socket.emit('message-down', `Welcome to the chatroom! Your assigned username is User${userCounter}.`);
    socket.emit('identify', username);
    console.log(`New user connected: ${username}`);
    socket.broadcast.emit('message-down', `**${username} has joined the chatroom!`);

    socket.on('message-up', (data) => {
        console.log(data);
        socket.broadcast.emit('message-down',`${data[0]}: ${data[1]}`);
    });
    
    socket.on('disconnect', () => {
        socket.broadcast.emit('message-down', `**${username} has left the chatroom.`);
        console.log(`**${username} has left the chatroom.`);
    });
});

io.on('error', (err) => {
    console.log(err);
});

server.listen(port);