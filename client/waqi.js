const https = require("https");

require("dotenv").config({
  path: __dirname + "/.env",
});

const token = process.env.TOKEN;

const options = {
  hostname: "api.waqi.info",
  port: 443,
  path: `/feed/london/?token=${token}`,
  method: "GET",
  headers: {
    // will fail if you don't set this
    "User-Agent": "Test client",
  },
};

const req = https.request(options, (res) => {
  //    console.log(`statusCode: ${res.statusCode}`)

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
