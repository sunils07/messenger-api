const http = require("http");
let io = require("socket.io");
const express = require("express");
const routes = require('./routes/index');
const { validateToken } = require("./helpers");
const app = express();
const server = http.createServer(app);

const userSocketIds = [];

const allUsers = [{
    userName: "Sunil D",
    id: 001,
    socketId: null,
    active: false,
    firends: [{
        userName: "Subhas W",
        id: 002,
        socketId: null,
        active: false
    }, {
        userName: "Amrut J",
        id: 005,
        socketId: null,
        active: false
    }]
}, {
    userName: "Subhas W",
    id: 002,
    socketId: null,
    active: false,
    firends: [{
        userName: "Sunil D",
        id: 001,
        socketId: null,
        active: false,
    }, {
        userName: "Amrut J",
        id: 005,
        socketId: null,
        active: false,
    }]
}, {
    userName: "Aman S",
    id: 003,
    socketId: null,
    active: false,
    firends: [{
        userName: "Sunil D",
        id: 001,
        socketId: null,
        active: false,
    }, {
        userName: "Amrut J",
        id: 005,
        socketId: null,
        active: false,
    }]
}, {
    userName: "Rohit P",
    id: 004,
    socketId: null,
    active: false,
    firends: [{
        userName: "Sunil D",
        id: 001,
        socketId: null,
        active: false,
    }, {
        userName: "Amrut J",
        id: 005,
        socketId: null,
        active: false,
    }]
}, {
    userName: "Amrut J",
    id: 005,
    socketId: null,
    active: false,
    firends: [{
        userName: "Sunil D",
        id: 001,
        socketId: null,
        active: false,
    }, {
        userName: "Rohit P",
        id: 004,
        socketId: null,
        active: false,
    }]
}, {
    userName: "Rahul J",
    id: 006,
    socketId: null,
    active: false,
    firends: [{
        userName: "Sunil D",
        id: 001,
        socketId: null,
        active: false,
    }, {
        userName: "Rohit P",
        id: 004,
        socketId: null,
        active: false,
    }]
}];

const onlineUsers = [{
    userName: "Sunil D",
    id: 001,
    socketId: null,
}, {
    userName: "Subhas W",
    id: 002,
    socketId: null,
}];


const users = [{
    userName: "Sunil D",
    id: 001,
    socketId: null,
    activeFriends: [{
    }]
}];

io = io(server);

// middleware
io.use((socket, next) => {
    const { token, id } = socket.handshake.query;

    if (validateToken(token)) {
        return next();
    }
    return next(new Error('authentication error'));
});


app.use((req, res, next) => {
    req.io = io;
    req.userSocketIds = userSocketIds;
    next();
});

io.on('connection', function (socket) {
    socket.on('message', (data) => {
        io.emit("message", "Hi");
    });

    socket.on('disconnect', function (socket) {
        const index = userSocketIds.indexOf(socket.id);
        userSocketIds.splice(index, 1);
    });
});

app.use('/', routes);

server.listen(4000, (err) => {
    console.log("On port 4000");
});