var github    = require("github");
var cache     = require("memory-cache");
var router    = require("./router.js");
var VALID_FOR = 5 * 60000; // Cache is valid for 5 minutes

var ghapi = new github({
    version: "3.0.0",
    headers: {
        "user-agent": "quinn-perfetto-personal-api"
    }
});

function getInfo(callback) {
    var CACHE_CODE = "github-getInfo";
    var cached = cache.get(CACHE_CODE);
    if (cached)
        return callback(cached);

    ghapi.events.getFromUserPublic({ user: "quinny" }, function(err, data) {
        if (err)
            return callback(err);
        cache.put(CACHE_CODE, data, VALID_FOR);
        callback(data);
    });
}

function getFollowing(callback) {
    var CACHE_CODE = "github-getFollowing";
    var cached = cache.get(CACHE_CODE);
    if (cached)
        return callback(cached);

    ghapi.user.getFollowingFromUser({ user: "quinny" }, function (err, data) {
        if (err)
            return callback(err);
        cache.put(CACHE_CODE, data, VALID_FOR);
        callback(data);
    });
}

function getFollowers(callback) {
    var CACHE_CODE = "github-getFollowers";
    var cached = cache.get(CACHE_CODE);
    if (cached)
        return callback(cached);

    ghapi.user.getFollowers({ user: "quinny" }, function (err, data) {
        if (err)
            return callback(err);
        cache.put(CACHE_CODE, data, VALID_FOR);
        callback(data);
    });
}

exports.registerRoutes = function(app) {
    router.jsonResponse(app, "/github/followers", getFollowers);
    router.jsonResponse(app, "/github/following", getFollowing);
    router.jsonResponse(app, "/github", getInfo);
}
