var feed      = require("feed-read");
var cache     = require("memory-cache");
var router    = require("./router.js");
var VALID_FOR = 86400000;

function getPosts(callback) {
    var CACHE_CODE = "blog-getPosts";
    var cached = cache.get(CACHE_CODE);
    if (cached)
        return callback(cached);
    feed("http://quinnftw.com/feed.xml", function(err, data) {
        if (err)
            return callback(err);
        cache.put(CACHE_CODE, data, VALID_FOR);
        callback(data);
    });
}

exports.registerRoutes = function(app) {
    router.jsonResponse(app, "/posts", getPosts);
}
