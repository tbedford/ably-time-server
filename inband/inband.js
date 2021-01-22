/*

inband meta events are events that are tiggered in channel (inband). Currently only occupancy events are suported. This means that inband occupancy events are
triggered if configured to do so. These inband occupancy events have the message name `[meta]occupancy`. 

Inband occupancy events are enabled using channel options, as shown in the code below. 

*/

var ably = new require("ably").Realtime(key + ":" + secret);

/* This channel option switches on inband occupancy events */
var channelOpts = { params: { occupancy: "metrics" } };

var channel = ably.channels.get("chat-server", channelOpts);

/* Note that the messages are named `[meta]occupancy`*/
channel.subscribe("[meta]occupancy", function(message) {
  console.log("inband: ----> ", message.data); // inband metadata events
});


/* Another way to get all messages on a channel, remove message name parameter */
channel.subscribe(function(message) {
  console.log("inband: ----> ", message.data);
});

