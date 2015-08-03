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
    fs.readFile(__dirname + "/../README.md", function(err, data) {
        var rendered = marked(data.toString());
        fs.readFile(__dirname + "/../index.tpl", function (err, data) {
            var s = data.toString().replace("$$$content$$$", rendered);
            cache.put(CACHE_CODE, s, VALID_FOR);
            callback(s);
        });
    });
}

exports.registerRoutes = function (app) {
    router.htmlResponse(app, "/", getIndex);
}
