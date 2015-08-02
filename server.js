var http    = require("http");
var connect = require("connect");
var app     = connect();

http.createServer(app).listen(8000, function() {
    console.log("Server started on 8000");
})
