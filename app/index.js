var router    = require("./router.js");
var marked    = require("marked");
var cache     = require("memory-cache");
var fs        = require("fs");
var VALID_FOR = 86400000; // 1 day

function getIndex(callback) {
    var CACHE_CODE = "index-getIndex";
    var cached = cache.get(CACHE_CODE);
    if (cached)
        return callback(cached);
    fs.readFile(__dirname + "/../index.html", function(err, data) {
        callback(data.toString());
    });
}

exports.registerRoutes = function (app) {
    router.htmlResponse(app, "/", getIndex);
}
