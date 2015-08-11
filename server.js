const http    = require("http");
const connect = require("connect");
const app     = connect();

const endPoints = [
    require("./app/github.js"),
    require("./app/fitness.js"),
    require("./app/blog.js"),
    require("./app/facebook.js"),
    require("./app/index.js")
];

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

endPoints.forEach(function(ep) {
    ep.registerRoutes(app);
});

http.createServer(app).listen(process.argv[2] || 80, function() {
    console.log("Server started on " + process.argv[2]);
})
