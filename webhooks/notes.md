# Incoming webhooks

Incoming webhooks provide a way to integrate external services with Ably. The incoming webhooks are routed to Ably channels as messages, and can be read and processed using the same approach as if processing any other Ably messages.

Many web services generate webhooks as a way of communicating with your web application. For example, services such as Twilio or Nexmo generate webhooks based on interaction with their APIs and infrastructure. Making a call via Nexmo will generate various webhooks. To allow your application to interact with these webhooks you need to configure the service with a webhook URL. The webhook URL specifies the destination for the generated webhooks. 

Ably has support for these incoming webhooks. You can configure your service with an Ably URL and webhook requests will be invoked on that endpoint. The webhook data will then be sent to the configured Ably channel as a message.

## Configuring your incoming webhook

In the Ably dashboard:

1. Click register a new webhook endpoint
2. Give your webhook a name
3. Specify a new or existing Ably channel
4. Copy the generated webhook URL and use it to configure your service

You can test your webhook is correctly configured using the test Curl requests provided.

## Code to generate webhook

``` shell
curl -X POST 'https://rest.ably.io/channels/webhook-test/messages?key=key:secret&enveloped=false' \
     -H 'content-type: application/json' --data '{"some":"json"}'
```

## Code to receive webhook

``` node
var ably = new require("ably").Realtime('key:secret');

ably.connection.on('connected', function() {
  console.log("That was simple, you're now connected to Ably in realtime");
});

var channel = ably.channels.get('webhook-test');

channel.subscribe(function(message) {
    let s  = JSON.stringify(message.data);
    console.log("webhook: " + s);
});
```

## Specifying message name

Specify message name via the header:

``` shell
curl -X POST 'https://rest.ably.io/channels/webhook-test/messages?key=key:secret&enveloped=false' \
     -H 'content-type: application/json' --data '{"some":"json"}' \
     -H 'X-Ably-Name: tony-message'
```

Your code to receive is now:

``` node
channel.subscribe('tony-message', function(message) {
//    let s  = JSON.stringify(message.data);
//    console.log("webhook: " + s);
    console.log("webhook: " + message);
});
```

