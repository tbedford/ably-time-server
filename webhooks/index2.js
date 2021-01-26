require("dotenv").config({
  path: __dirname + "/.env",
});

const key = process.env.API_KEY;
const secret = process.env.API_SECRET;

var ably = new require("ably").Realtime(key + ':' + secret);

ably.connection.on('connected', function() {
  console.log("That was simple, you're now connected to Ably in realtime");
});

var channel = ably.channels.get('webhook-test');

channel.subscribe(function(message) {
//    let s  = JSON.stringify(message.data);
//    console.log("webhook: " + s);
    console.log("webhook: " + message);
});


