// simple client that uses TokenRequest for authentication
var auth_url = "http://localhost:7777/auth";

if (process.argv.length < 3) {
  console.log("You must enter a clientId");
  process.exit(-1);
}

const clientId = process.argv[2];
auth_url = auth_url + "/" + clientId;

const ably = new require("ably").Realtime({
  authUrl: auth_url,
  clientId: clientId,
});

// Monitor connection state
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

channel.presence.subscribe("enter", function (member) {
  console.log("Member " + member.clientId + " entered");
});

channel.presence.enter();
