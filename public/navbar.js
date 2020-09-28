'use strict'

$( document ).ready( function () {

  let navbarApp = {

    environment: null,

    bindEvents: function () {
      let self = this

      $( '#add-post-button' ).click( function () {
        self.addPost()
      })

      // Check for click events on the navbar burger icon
      $( '.navbar-burger').click( function () {
        self.enableHamburgerMenu()
      })
    },

    enableHamburgerMenu: function () {
      let self = this

      // Toggle the 'is-active' class on both the 'navbar-burger' and the 'navbar-menu'
      $( '.navbar-burger' ).toggleClass( 'is-active' )
      $( '.navbar-menu' ).toggleClass( 'is-active' )
    },

    addPost: function () {
      let self = this

      $.post(
        '/posts?test=hello',
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