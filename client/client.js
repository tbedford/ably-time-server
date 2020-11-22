// TODO - get auth token request

const ably = new require('ably').Realtime("");

// get connected - required? test it - you don't actually need this!!!!!
//ably.connection.on('connected', function() {
//  console.log("That was simple, you're now connected to Ably in realtime");
//});

var channel = ably.channels.get('time-server');

channel.subscribe('time', function(message) {
  console.log("Time on server: " + message.data);
});
