const express   = require('express')
const path      = require('path')

const app       = express() 
const server    = require('http').createServer(app)
const io        = require('socket.io')(server)
let messages    = []


io.on('connection', socket => {
    console.log(`Connected id: ${socket.id}`)
    socket.emit('isLoggedIn', socket.id);
    socket.on('sendMessage', data => {
        messages.push(data)
        io.emit('receivedMessage', messages)
    })
})

let port = process.env.port || 3333 
server.listen(port)