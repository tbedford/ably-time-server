const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config({
  path: __dirname + "/.env",
});

const key = process.env.API_KEY;
const secret = process.env.API_SECRET;
const ably = new require("ably").Realtime(key + ":" + secret);

const ttl = 1000 * 60 * 10; // We always set this to 10 minutes

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/auth").get(generateToken);

app.route("/auth/:clientId").get(generateToken);

/* Issue token requests to clients sending a request to the /auth endpoint */
function generateToken(req, res) {
  console.log("Generating TokenRequest...");

  var tokenParams = {};
  tokenParams["ttl"] = ttl;

  if (req.params["clientId"]) {
    const clientId = req.params["clientId"];
    console.log(`clientId: ${clientId}`);
    tokenParams["clientId"] = clientId;
  }

  ably.auth.createTokenRequest(tokenParams, function (err, tokenRequest) {
    if (err) {
      res.status(500).send("Error requesting token: " + JSON.stringify(err));
    } else {
      const tr = JSON.stringify(tokenRequest);
      console.log(tr);
      res.setHeader("Content-Type", "application/json");
      res.send(tr);
    }
  });
}

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Auth server is listening on port " + listener.address().port);
});
