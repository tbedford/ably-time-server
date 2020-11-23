// A simple IoT client that uses JWTs for authentication

const https = require("https");
const { exit } = require("process");

const auth_url = "https://flawless-buttery-legal.glitch.me/jwt"

var jwt = null;

const options = {
  hostname: "flawless-buttery-legal.glitch.me",
  port: 443,
  path: "/jwt",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "IoT client v0.1",
  },
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    jwt = d.toString();
    jwt = JSON.parse(jwt);   // Must be in JSON
    console.log(jwt);

    const ably = new require("ably").Realtime(jwt);
//    const ably = new require("ably").Realtime({authUrl: auth_url});

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
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
