// A simple client that uses JWTs for authentication

var auth_url = "http://localhost:8000/jwt";
const ably = new require("ably").Realtime({ authUrl: auth_url });

ably.connection.on("connecting", function () {
  console.log("Connecting to Ably...");
});
ably.connection.on("connected", function () {
  console.log("Connected");
});
ably.connection.on("disconnected", function () {
  console.log("Disconnected from Ably...");
});
ably.connection.on("suspended", function () {
  console.log("Disconnected from Ably for a while (suspended)...");
});

const channel = ably.channels.get("time-server");

channel.subscribe("time", function (message) {
  console.log("Time on server is: " + message.data);
});
