'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  DataPoint = mongoose.model('DataPoint'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


// Create the chat configuration
module.exports = function (io, socket) {
  // Emit the status event when a new socket client is connected
  /*
  io.emit('chatMessage', {
    type: 'status',
    text: 'Is now connected',
    created: Date.now(),
    profileImageURL: socket.request.user.profileImageURL,
    username: socket.request.user.username
  });*/

  // Send a chat messages to all connected sockets when a message is received
  socket.on('chatMessage', function (message) {
    message.type = 'message';
    message.created = Date.now();
    message.profileImageURL = socket.request.user.profileImageURL;
    message.username = socket.request.user.username;

    // Emit the 'chatMessage' event
    io.emit('chatMessage', message);
  });

  var emitName = 'dbChange';
  io.on('connection', function(socket){
    socket.on(emitName, function(msg) {
      console.log('message: ' + msg);
      io.emit('newResult', msg);

      //Save the information to MongoDB

      var datapoint = new DataPoint({ value: msg });
      datapoint.save(function (err) {
        if (err) {
          console.log('Error Did not save');
        } else {
          console.log('Saved Fine');
        }
      });
    });
  });

  /*
  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    io.emit('chatMessage', {
      type: 'status',
      text: 'disconnected',
      created: Date.now(),
      username: socket.request.user.username
    });
  });
*/
};
