const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001
const http = require('http').Server(app);
const io = require('socket.io')(http)
const message = require('./routes/chat.routes');
const connectDB = require('./config/db.config')

app.use(cors())
 

//needed otherwise there'll be cors errors sometimes
connectDB();
//json
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use("/api/messages", message)



io.on('connection', (socket => {
    console.log(`User connected: ${socket.id}`)


    socket.on('joinedChannel', (channel, user) => {
        
        socket.join(channel)
        socket.to(channel).emit('userJoined', user)
        console.log(`User ${user} joined channel: ${channel}`)
    })


    socket.on('messageSend', (data) => {
        console.log('Message Send')
        socket.to(data.channel).emit('messageReceived', data)
    })


    socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.id}`)
    })

}))



http.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`)
})



