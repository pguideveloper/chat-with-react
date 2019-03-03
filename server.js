const express       = require('express')
const cors          = require('cors')

const app           = express() 
const server        = require('http').createServer(app)
const io            = require('socket.io')(server)
let messages        = []
let connectedUsers  = []

app.use(cors())

io.on('connection', socket => {
    console.log(`Connected id: ${socket.id}`)
    socket.on('createUser', data => {
        console.log(data)
        connectedUsers.push(data)
        io.emit('loggedUsers', connectedUsers)
    })
    socket.emit('isLoggedIn', socket.id);
    socket.on('sendMessage', data => {
        console.log(data)
        messages.push(data)
        io.emit('receivedMessage', messages)
    })
})

let port = process.env.port || 3333 
server.listen(port)