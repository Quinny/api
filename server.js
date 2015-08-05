var http    = require("http");
var connect = require("connect");
var app     = connect();

var endPoints = [
    require("./app/github.js"),
    require("./app/fitness.js"),
    require("./app/blog.js"),
    require("./app/facebook.js"),
    require("./app/index.js")
];

endPoints.forEach(function(ep) {
    ep.registerRoutes(app);
});

http.createServer(app).listen(process.argv[2], function() {
    console.log("Server started on " + process.argv[2]);
})
