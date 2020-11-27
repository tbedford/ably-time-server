const https = require("https");

require("dotenv").config({
  path: __dirname + "/.env",
});

const key = process.env.API_KEY;
const secret = process.env.API_SECRET;
const token = process.env.TOKEN;
const city = "manila";

const options = {
  hostname: "api.waqi.info",
  port: 443,
  path: `/feed/${city}/?token=${token}`,
  method: "GET",
  headers: {
    // will fail if you don't set this
    "User-Agent": "Test client",
  },
};

const ably = new require("ably").Realtime(key + ":" + secret);
const channel = ably.channels.get("waqi-channel");

function getAQI() {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      if (res.statusCode == 200) {
        res.on("data", (d) => {
          data = d.toString();
          resolve(data);
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

async function executeGetAQI() {
  try {
    const n = await getAQI();
    console.log(n);
    channel.publish("london-waqi", n);
  } catch (e) {
    console.error(`Failed: ${e}`);
  } finally {
    //console.log("Finaaalllyyy!");
  }
}

executeGetAQI();
const d = 1000 * 60 * 1; // delay is in ms
setInterval(executeGetAQI, d);
