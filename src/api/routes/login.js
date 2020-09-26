const routes = require( 'express' ).Router()
const mustache = require( 'mustache-express' )


routes.get( '/login', ( req, res ) => {
  res.render( 'login.html', { title: 'Log in' } )
})

module.exports = routes