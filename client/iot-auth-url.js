const Ably = require("ably");
const auth_url = "https://petal-respected-oriole.glitch.me/token"; // you can use /jwt or /auth (TokenRequest)
const auth_headers = {'User-Agent': 'fake'}
const ably = new Ably.Realtime({authUrl: auth_url, authHeaders: auth_headers});

ably.connection.on("connecting", () => {
  console.log("Connecting to Ably...");
});

ably.connection.on("connected", () => {
  console.log("Connected");
});
