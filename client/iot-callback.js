const https = require("https");

const options = {
  hostname: "flawless-buttery-legal.glitch.me",
  port: 443,
  path: "/jwt",  // You can also change this to /auth and it will then work with TokenRequest rather than Ably JWT 
  method: "GET",
  headers: {
    // will fail if you don't set this
    "User-Agent": "IoT client v0.1",
  },
};

const ably = new require("ably").Realtime({
  authCallback: (tokenParams, callback) => {
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      if (res.statusCode == 200) {
        res.on("data", (d) => {
          token = d.toString();
          token = JSON.parse(token);
          callback(null, token);
        });
      } else {
        console.error("Response code was not 200.");
        callback(res.statusCode, null)
      }
    });

    // error making request
    req.on("error", (error) => {
      console.log("Something went bang...");
      console.error(error);
    });

    req.end();
  },
});

ably.connection.on("connecting", function () {
  console.log("Connecting to Ably...");
});

ably.connection.on("connected", function () {
  console.log("Connected");
});

const channel = ably.channels.get("ably-time-server");

channel.subscribe("time", function (message) {
  console.log("Time on server is: " + message.data);
});
