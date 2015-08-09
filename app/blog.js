const feed      = require("feed-read");
const cache     = require("memory-cache");
const router    = require("./router.js");
const VALID_FOR = 86400000;

function getPosts(callback) {
    const CACHE_CODE = "blog-getPosts";
    const cached = cache.get(CACHE_CODE);
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
    // end-point: /posts
    // The most recent posts from quinnftw.com 
    router.jsonResponse(app, "/posts", getPosts);
}
