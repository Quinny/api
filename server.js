var http    = require("http");
var connect = require("connect");
var app     = connect();

var github = require("./app/github.js");
github.registerRoutes(app);

var fitness = require("./app/fitness.js");
fitness.registerRoutes(app);

var blog = require("./app/blog.js");
blog.registerRoutes(app);

var me = require("./app/me.js");
me.registerRoutes(app);

var index = require("./app/index.js");
index.registerRoutes(app);

http.createServer(app).listen(process.argv[2], function() {
    console.log("Server started on " + process.argv[2]);
})
