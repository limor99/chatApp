const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


require('./configs/dbConfig.js');
const formatMessage = require('./Utils/messageUtil');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./Utils/userUtil');

const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = 'Admin';

//Run when client connect
io.on('connection', socket =>{
    console.log(`New websocket connection, socket id: ${socket.id}`);

    socket.on('joinRoom', ({username, roomName}) =>{
        const user = userJoin(socket.id, username, roomName);

        socket.join(user.room);

        //Welcome current user
        socket.emit('message',  formatMessage(botName,'Welcome to my chat'));

        //broadcast when user connect
        socket.broadcast.to(user.room).emit('message',  formatMessage(botName,`${user.username} has JOIN the chat`));

        //Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        })

    })

    //Listen for chatMessage
    socket.on('chatMessage', msg =>{
        //console.log(msg);
        const currentUser = getCurrentUser(socket.id);
        io.to(currentUser.room).emit('message', formatMessage(currentUser.username, msg));
    })

    //Runs when clien disconnect
    socket.on('disconnect', () =>{
        const leaveUser = userLeave(socket.id);
        if(leaveUser){
            io.to(leaveUser.room).emit('message', formatMessage(botName, `${leaveUser.username} has LEFT the chat`));

            //Send users and room info
            io.to(leaveUser.room).emit('roomUsers', {
                room: leaveUser.room,
                users: getRoomUsers(leaveUser.room)
            })
        }
        
    })

})

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.use(cors());

//const index = require("./routes/index");

app.use('/api/users', require('./routes/usersRouter'));
//app.use(index);
 


const PORT = 5000 || process.env.PORT;
server.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}`);
});