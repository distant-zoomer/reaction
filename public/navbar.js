'use strict'

$( document ).ready( function () {

  let navbarApp = {

    environment: null,

    bindEvents: function () {
      let self = this

      $( '#add-post-button' ).click( function () {
        self.addPost()
      })
    },

    addPost: function () {
      let self = this

      $.post(
        '/posts',
        {
          environment: self.environment,
          test: 'hello'
        },
        function ( response ) {
          console.log( 'response:', response )
        }
      )
    }

  }

  navbarApp.bindEvents()

})