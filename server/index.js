import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { getUser, getUsers, removeUser, addUser } from './users.js';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let ROOMID; let IMAGEURL;
const roomData = [];
app.get('/', (req, res) => {
    res.send('this is working');
})

io.on('connection', (socket) => {
    socket.on('userJoined', (data) => {
        console.log('user is joined....');
        const { userName, roomId, maker, joiner } = data;
        ROOMID = roomId;
        socket.join(roomId);
        addUser({ userName, roomId, maker, joiner, socketId: socket.id });
        const users = getUsers(roomId);
        socket.emit('userJoined', { success: true, user: { userName, roomId, maker, joiner, socketId: socket.id } });

        socket.broadcast.to(roomId).emit("AllUsers", { users });

    });
    socket.on('getUsers', (data) => {
        const users = getUsers(data.roomId);
        socket.emit('allUsers', { users });
        if (data.joiner) {
            const room = roomData.find((room) => room.roomId === data.roomId);
            if (room)
                socket.emit('imageGetFirst', { image: room.image });
        }
    })
    socket.on('imageSend', (data) => {
        const IMAGEURL = data.image;
        const roomId = data.roomId;

        //  const user = getUser(socket.id);
        const index = roomData.findIndex((room) => room.roomId === roomId);
        if (index === -1) {

            roomData.push({ image: IMAGEURL, roomId });
        }
        else {
            roomData[index].image = IMAGEURL
        }
        socket.broadcast.to(roomId).emit("canvasImage", {
            image: IMAGEURL
        })
    });
    socket.on('message', (data) => {

        const userObj = getUser(socket.id);
        console.log('inside the message ...');
        if (userObj) {
            socket.emit("messageResponsetoUser", {
                message: data.mess
            })
            socket.broadcast.to(userObj.roomId).emit("messageResponse", {
                message: data.mess
            })
        }
    })
    socket.on('disconnect', () => {
        console.log('user is disconnected');
        const user = getUser(socket.id);
        if (user) {
            if (user.maker)
                roomData.filter((room) => room.roomId !== user.roomId)
            removeUser(socket.id);
            socket.broadcast.to(user.roomId).emit("userLeftMessage", {
                name: user.userName,
            });
            const users = getUsers(user.roomId);
            socket.broadcast.to(user.roomId).emit("AllUsers", { users });
        }
    })
});


io.on('disconnected', () => {
    console.log('client is disconnected');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server is listning on PORT ${PORT}........`);
})