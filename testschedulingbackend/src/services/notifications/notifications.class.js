/* eslint-disable no-unused-vars */
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio');

const app = feathers();

app.get('/', function(req, res) {
  res.sendFile('notifications.html');
});

app.configure(socketio(function(io) {
  io.on('connection', function (socket) {
    socket.on( 'new-notification', function(data) {
      io.sockets.emit( 'show-notification', {
        title: data.title,
        message: data.message
      });
    });
  });
}));

app.listen(4200);