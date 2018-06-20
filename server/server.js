const path =require('path');
const http=require('http');
const publicPath=path.join(__dirname+'/../public');
const express = require('express');
const port=process.env.PORT||3000;

const socketIO=require('socket.io');

const app = express();
const server = http.createServer(app);
const io =socketIO(server);

const {generateMessage}=require('./utils/message.js')

io.on('connection',(socket)=>{
    console.log('New User Connected');


    socket.emit('newMessage',generateMessage('Admin','Welcome'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

    socket.on('createMessage',(message,callback)=>{
      console.log('createMessage',message);
      io.emit('newMessage',generateMessage(message.from,message.text));
      callback('Because you are always wrong');

    });


    socket.on('disconnect',(socket)=>{
        console.log('User Disconnected');
    });
});





app.use(express.static(publicPath));
server.listen(port,() =>{
  console.log(`Running on ${port}`);
})
