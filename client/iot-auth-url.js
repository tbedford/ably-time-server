const Ably = require("ably");
const auth_url = "https://flawless-buttery-legal.glitch.me/jwt";

const jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjI4R1k2dy5JU1FpMFEifQ.eyJpYXQiOjE2MDYxNTA4NDcsImV4cCI6MTYwNjE1NDQ0NywieC1hYmx5LWNhcGFiaWxpdHkiOiJ7XCIqXCI6W1wiKlwiXX0ifQ.09CDr6y_sEfnHKVpQ8SIIycP7OkgKIrrdUQW8gZBKZo"

//var rest = new Ably.Rest({authUrl: auth_url});
var rest = new Ably.Rest(jwt);
var channel = rest.channels.get("time-server");

rest.stats({ unit: "hour" }, function (err, resultPage) {
  var thisHour = resultPage.items[0];
  console.log(thisHour); // => {all: a, inbound: f, outbound: f, …}
});
