require("dotenv").config({
  path: __dirname + "/.env"
});

const key = process.env.API_KEY
const secret = process.env.API_SECRET

const ably = new require('ably').Realtime(key + ':' + secret);
const channel = ably.channels.get('time-server');

function doTime(){
    const time = new Date();
    console.log(`Time on server is: ${time}`);
    channel.publish('time', time.toString());
    return;
}

setInterval(doTime, 2000);
console.log("Hello")
// TODO: check for clients

