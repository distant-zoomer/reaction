const routes = require( 'express' ).Router()

routes.get( '/posts', ( req, res ) => {
  res.status(200).json( { message: 'Connected!' } )
})

routes.post( '/posts', ( req, res ) => {

  // req.query gets the query parameters in object notation
  console.log( 'req.query', req.query )

  res.json( { message: 'Successful JSON response' } )
})

module.exports = routes