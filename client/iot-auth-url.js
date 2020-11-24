const Ably = require("ably");
const auth_url = "https://flawless-buttery-legal.glitch.me/auth";

var ably = new Ably.Realtime({authUrl: auth_url});

ably.connection.on("connecting", function () {
  console.log("Connecting to Ably...");
});

ably.connection.on("connected", function () {
  console.log("Connected");
});