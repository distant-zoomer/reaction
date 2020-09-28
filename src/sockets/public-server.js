const io = require( 'socket.io' )( 3000 )

const users = {}

// Setting up websocket connection and subsequent events
io.on( 'connection', socket => {
  socket.on( 'send-chat-message', message => {
    socket.broadcast.emit( 'chat-message', { message: message, name: users[ socket.id ] } )
  })

  socket.on( 'new-user', userName => {
    users[ socket.id ] = userName
    socket.broadcast.emit( 'user-connected', userName )
  })

  socket.on( 'disconnect', () => {
    socket.broadcast.emit( 'user-disconnected', users[ socket.id ] )
    delete users[ socket.id ]
  })
  
})