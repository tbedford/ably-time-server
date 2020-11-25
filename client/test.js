var ablyRest = new Ably.Rest("xVLyHw.Ozpisg:eaN0wu95LgwYJnXd");

var realtime = new Ably.Realtime({
  authCallback: function (tokenParams, callback) {
      
    ablyRest.auth.requestToken(function (err, token) {
      $("#auth-status").append(
        "<li>Token obtained and returned in callback from authCallback: " +
          JSON.stringify(token) +
          "</li>"
      );
      callback(err, token);
    });
  },
});
