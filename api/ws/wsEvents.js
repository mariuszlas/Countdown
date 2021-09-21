function send(socket) {
    socket.emit('new', 'send from imported function')
}

module.exports = { send }
