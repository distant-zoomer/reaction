const routes = require( 'express' ).Router()

routes.get( '/public-server', ( req, res ) => {
  res.render( 'public-server.html', { 'title': 'Reaction' } )
})

module.exports = routes