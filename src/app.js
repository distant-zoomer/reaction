// Importing modules
const express = require("express")
const app = express()
const port = process.env.PORT || 3200
const bodyparser = require("body-parser")
const webpack = require('webpack');
const mustacheExpress = require( 'mustache-express' )
const io = require( 'socket.io' )( 3000 )

// Routers
const postsRouter = require( './api/routes/posts' )
const baseRouter = require( './api/routes/base' )
const usersRouter = require( './api/routes/users' )
const loginRouter = require( './api/routes/login' )
const publicServerRouter = require( './api/routes/public-server' )


// ===========================================================
// Middleware
// ===========================================================

// Setting up websocket connection
const users = {}

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

// Connecting sockets
app.use( '/', publicServerRouter )

// View engine
app.engine( 'html', mustacheExpress() )

app.set( 'view engine', 'html' )
app.set( 'views', __dirname + '/views' )

app.use( express.static( 'public' ) )

// Adding all of our routes
app.use( '/', postsRouter )
app.use( '/', baseRouter )
app.use( '/', usersRouter )
app.use( '/', loginRouter )
app.use( '/', publicServerRouter )


// Github pages converter
var pages = require( 'node-github-pages' ) ( app, {
  static: 'public', // Static directory path(css, js...)
  path: 'docs' // Output path
});

pages.renderFiles(
  [
    {
      'view': './views/index.html',
      'url': '',
      'options': { title: 'Express' }
    },
    {
      'view': './views/public-server.html',
      'url': '/public-server',
      'options': { title: 'second page' }
    }
  ]
)


// Server
app.listen(port, () => {
  console.log( `running at port ${port}` )
})