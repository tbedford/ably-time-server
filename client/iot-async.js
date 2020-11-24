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

function getJWT() {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      if (res.statusCode == 200) {
        res.on("data", (d) => {
          jwt = d.toString();
          jwt = JSON.parse(jwt);
          resolve(jwt);
        });
      } else {
        console.error("Response code was not 200.");
        reject(res.statusCode);
      }
    });

    req.on("error", (error) => {
      console.log("Something went bang...");
      console.error(error);
      reject(error);
    });

    req.end();
  });
}

/*
// Promise version
getRequest()
  .then((v) => {
    console.log(v);
  })
  .catch((e) => {
    console.error(e);
  });
*/

// async version
async function executeGetJWT() {
  try {
    const n = await getJWT();
    console.log(n);
    ably(n);

  } catch (e) {
    console.error(`Failed: ${e}`);
  } finally {
    console.log("Finaaalllyyy!");
  }
}

executeGetJWT()

function ably(x) {

  const ably = new require("ably").Realtime(x);

  ably.connection.on("connecting", function () {
    console.log("Connecting to Ably...");
  });
  
  ably.connection.on("connected", function () {
    console.log("Connected");
  });

  // Do stuff

}