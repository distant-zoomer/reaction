// Importing modules
const express = require("express")
const app = express()
const port = process.env.PORT || 3200
const bodyparser = require("body-parser")
const webpack = require('webpack');
const mustacheExpress = require( 'mustache-express' )

// Routers
const postsRouter = require( './api/routes/posts' )
const baseRouter = require( './api/routes/base' )
const usersRouter = require( './api/routes/users' )
const loginRouter = require( './api/routes/login' )


// ===========================================================
// Middleware
// ===========================================================

// View engine
app.engine( 'html', mustacheExpress() )

app.set( 'view engine', 'html' )
app.set( 'views', __dirname + '/views' )

// // Webpack
// webpack(
//   {
//     // Configuration Object
//   },
//   ( err, stats ) => { // Stats Object
//   if ( err || stats.hasErrors() ) {
//     // Handle errors here
//   }
//   // Done processing
// });

// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({ extended: false }))
app.use( express.static( 'public' ) )

// Adding all of our routes
app.use( '/', postsRouter )
app.use( '/', baseRouter )
app.use( '/', usersRouter )
app.use( '/', loginRouter )


// Server
app.listen(port, () => {
  console.log(`running at port ${port}`)
})