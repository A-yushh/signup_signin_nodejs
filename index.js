const express= require('express');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const connectDb= require('./Dbconnect/connect');
const router =require('./Routers/router')
dotenv.config();
const app = express();

const port = process.env.PORT;
const server = app.listen(port,()=>{
  console.log(`Server listening at ${port}`);
});

const io = new Server(server);

app.use(express.json());
app.use(cookieParser());
connectDb();
app.get('/', (req, res) => {
  
  res.send('Hello, Express!');
});

app.get('/chat', (req, res) => { 
  res.sendFile(__dirname + '/index.html'); 
});
app.use('/users',router);

io.on('connection', (socket) => { 
  socket.on('send name', (username) => { 
      io.emit('send name', (username)); 
  }); 

  socket.on('send message', (chat) => { 
      io.emit('send message', (chat)); 
  }); 
  socket.on('sendTyping', (data) => { 
    io.emit('typing', (data)); 
});
});
// app.listen(port, () => {
//   console.log(`Server listening at ${port}`);
// });