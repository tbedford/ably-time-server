const express = require("express");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");

require("dotenv").config({
  path: __dirname + "/.env",
});

const key = process.env.API_KEY;
const secret = process.env.API_SECRET;
const acl = process.env.ACL;
const exp = process.env.EXP;

console.log(`acl: ${acl}`);
console.log(`exp: ${exp}`);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/jwt").get(genAblyJWT);

function genAblyJWT(req, res) {
  console.log("Generating Ably JWT...");

  const header = {
    typ: "JWT",
    alg: "HS256",
    kid: key,
  };

  const currentTime = Math.round(Date.now() / 1000);

  const claims = {
    iat: currentTime /* current time in seconds */,
    exp: currentTime + parseInt(exp) /* time of expiration in seconds */,
    "x-ably-capability": '{"*":["*"]}', // TODO: read from env file, but this works
  };

  const base64Header = b64(CryptoJS.enc.Utf8.parse(JSON.stringify(header)));
  const base64Claims = b64(CryptoJS.enc.Utf8.parse(JSON.stringify(claims)));
  const token = base64Header + "." + base64Claims;

  /* Apply the hash specified in the header */
  const signature = b64(CryptoJS.HmacSHA256(token, secret));
  const ablyJwt = token + "." + signature;

  res.setHeader("Content-Type", "application/json");
  jwt = JSON.stringify(ablyJwt);
  console.log(jwt);
  res.setHeader("Content-Type", "application/json");
  res.send(jwt);
}

function b64(token) {
  encode = CryptoJS.enc.Base64.stringify(token);
  encode = encode.replace(/\=+$/, "");
  encode = encode.replace(/\+/g, "-");
  encode = encode.replace(/\//g, "_");

  return encode;
}

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Auth server is listening on port " + listener.address().port);
});
