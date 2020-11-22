/*
var auth_url = "http://localhost:9000/auth";
clientId = "someClientId";
auth_url = auth_url + '/' + clientId;
*/

var auth_url = "http://localhost:9000/jwt";

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
  console.log("Time on server: " + message.data);
});
