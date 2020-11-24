var ablyRest = new Ably.Rest('xVLyHw.Ozpisg:eaN0wu95LgwYJnXd');

$('input#connect').on('click', function() {
  var realtime = new Ably.Realtime({ authCallback: function(tokenParams, callback) {
    $('#auth-status').append('<li>authCallback called with tokenParams: ' + JSON.stringify(tokenParams) + '</li>');
    ablyRest.auth.requestToken(function(err, token) {
      $('#auth-status').append('<li>Token obtained and returned in callback from authCallback: ' + JSON.stringify(token) + '</li>');
      callback(err, token);
    });
  }});

  $('#auth-status').append('<li>Realtime client library created...</li>');

  realtime.connection.on('connecting', function() {
    $('#auth-status').append('<li>Connecting...</li>');
  });

  realtime.connection.on('connected', function() {
    $('#auth-status').append($('<li>✓ Connected to Ably using token provided from callback</li>').css('color', 'green'));
  });
});
