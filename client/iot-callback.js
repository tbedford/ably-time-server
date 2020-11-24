const https = require("https");

const options = {
  hostname: "flawless-buttery-legal.glitch.me",
  port: 443,
  path: "/jwt",
  method: "GET",
  headers: {
    // will fail if you don't set this
    "User-Agent": "IoT client v0.1",
  },
};
function doRequest() {
  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    if (res.statusCode == 200) {
      res.on("data", (d) => {
        jwt = d.toString();
        jwt = JSON.parse(jwt);
        console.log(jwt);
      });
    } else {
      console.error("Response code was not 200.");
    }
  });

  // error making request
  req.on("error", (error) => {
    console.log("Something went bang...");
    console.error(error);
  });

  req.end();
}

doRequest();

// function(tokenParams, callback(err, tokenOrTokenRequest))

/*
const ably = new require("ably").Realtime({authCallback: getToken});

ably.connection.on("connecting", function () {
  console.log("Connecting to Ably...");
});

ably.connection.on("connected", function () {
  console.log("Connected");
});
*/
