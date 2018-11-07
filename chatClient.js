const io = require('socket.io-client');
const client = io.connect('http://localhost:1234');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdin,
    terminal: false
});

var identifier;

client.on('identify', (data) => {
    identifier = data;
});

rl.on('line', (line) => {
    client.emit('message-up', [identifier,line]);
});

client.on('message-down', (data) => {
    console.log(data);
});

