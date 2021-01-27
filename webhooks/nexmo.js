require("dotenv").config({
  path: __dirname + "/.env",
});

const key = process.env.API_KEY;
const secret = process.env.API_SECRET;

var ably = new require("ably").Realtime(key + ':' + secret);

ably.connection.on('connected', function() {
  console.log("You're now connected to Ably in realtime");
});

var channel = ably.channels.get('webhook-test');

channel.subscribe((message) => {
    console.log(JSON.stringify(message.data, null, 3));
    console.log("------------------------------------------------")
});


