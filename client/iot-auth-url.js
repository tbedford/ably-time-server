const Ably = require("ably");
//const auth_url = "https://flawless-buttery-legal.glitch.me/auth"; // doesn;t work
const auth_url = "http://localhost:8000/jwt"; // does work, but both auth servers use same code

var ably = new Ably.Realtime({authUrl: auth_url});

ably.connection.on("connecting", function () {
  console.log("Connecting to Ably...");
});

ably.connection.on("connected", function () {
  console.log("Connected");
});