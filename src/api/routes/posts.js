const routes = require( 'express' ).Router()

routes.get( '/posts', ( req, res ) => {
  res.status(200).json( { message: 'Connected!' } )
})

routes.post( '/posts', ( req, res ) => {
  console.log( 'req.body', req.body )
  res.json( { message: 'Successful JSON response' } )
})

module.exports = routes