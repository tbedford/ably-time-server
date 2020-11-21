var http = require('http')

http.createServer(function (req, res) {
    res.write('hello from Node server')
    console.log("hello")
    res.end(); // end the response
}).listen(9999);
