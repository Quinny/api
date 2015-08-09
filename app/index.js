const router    = require("./router.js");
const cache     = require("memory-cache");
const fs        = require("fs");
const VALID_FOR = 86400000; // 1 day

function getIndex(callback) {
    const CACHE_CODE = "index-getIndex";
    const cached = cache.get(CACHE_CODE);
    if (cached)
        return callback(cached);
    fs.readFile(__dirname + "/../index.html", function(err, data) {
        callback(data.toString());
    });
}

exports.registerRoutes = function (app) {
    router.htmlResponse(app, "/", getIndex);
}
