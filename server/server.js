const path =require('path');
const http=require('http');
const publicPath=path.join(__dirname+'/../public');
const express = require('express');
const port=process.env.PORT||3000;

const socketIO=require('socket.io');

const app = express();
const server = http.createServer(app);
const io =socketIO(server);

io.on('connection',(socket)=>{
    console.log('New User Connected');


    socket.on('disconnect',(socket)=>{
        console.log('User Disconnected');
    });
});




app.use(express.static(publicPath));
server.listen(port,() =>{
  console.log(`Running on ${port}`);
})
