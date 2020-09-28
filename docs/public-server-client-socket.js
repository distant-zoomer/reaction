'use strict'

const socket = io( 'http://localhost:3000' )
const messageContainer = $( '#message-container' )
const messageForm = $( '#send-container' )
const messageInput = $( '#message-input' )

// Getting user and announcing joining
const userName = prompt( 'What is your name?' )
appendMessage( `<strong class="has-text-white">${ userName }</strong> joined the public server` )
socket.emit( 'new-user', userName )

// Sending message
messageForm.submit( function ( e ) {
  e.preventDefault()
  const message = messageInput.val()
  // appendMessage( `<strong class="has-text-white">You</strong>: ${ message }` )
  appendMessage( `<strong class="has-text-white">${ userName }</strong>: ${ message }` )
  socket.emit( 'send-chat-message', message )
  messageInput.val( '' )
})

// Listening for data sent from server
socket.on( 'chat-message', data => {
  console.log( 'data from server:', data )
  let msg = `<strong class="has-text-white">${ data.name }</strong>: ${ data.message }`
  console.log( 'msg:', msg )
  appendMessage( msg )
})

socket.on( 'user-connected', userName => {
  console.log( 'userName from server:', userName )
  appendMessage( `<strong class="has-text-white">${ userName }</strong> connected` )
})

socket.on( 'user-disconnected', userName => {
  console.log( 'userName from server:', userName )
  appendMessage( `<strong class="has-text-white">${ userName }</strong> disconnected` )
})

// Append message to screen
function appendMessage ( message ) {
  const messageElement = $( 'div' )
  messageContainer.append( `<div class="chat-individual-message"> ${ message } </div>` )

  // Scrolls with newly appended messages
  $( 'html, body' ).animate( { scrollTop: messageContainer.height() }, 0 )
}