// A simple IoT client that uses JWTs for authentication

const https = require("https");
const { exit } = require("process");
const Ably = require("ably");

const auth_url = "https://flawless-buttery-legal.glitch.me/jwt";

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
    jwt = JSON.parse(jwt); // Must do this otherwise we have extra double quote marks!
    console.log(jwt);

    var rest = new Ably.Rest(jwt);
    var channel = rest.channels.get("time-server");

    rest.stats({ unit: "hour" }, function (err, resultPage) {
      var thisHour = resultPage.items[0];
      console.log(thisHour); // => {all: a, inbound: f, outbound: f, …}
    });
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
