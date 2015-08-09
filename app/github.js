const github    = require("github");
const cache     = require("memory-cache");
const router    = require("./router.js");
const VALID_FOR = 5 * 60000; // Cache is valid for 5 minutes

const ghapi = new github({
    version: "3.0.0",
    headers: {
        "user-agent": "quinn-perfetto-personal-api"
    }
});

function getInfo(callback) {
    const CACHE_CODE = "github-getInfo";
    const cached = cache.get(CACHE_CODE);
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
    const CACHE_CODE = "github-getFollowing";
    const cached = cache.get(CACHE_CODE);
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
    const CACHE_CODE = "github-getFollowers";
    const cached = cache.get(CACHE_CODE);
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
    // end-point: /github/followers
    // People who follow me on github
    router.jsonResponse(app, "/github/followers", getFollowers);
    // end-point: /github/following
    // People who I follow on github
    router.jsonResponse(app, "/github/following", getFollowing);
    // end-point: /github
    // My recent activity on github (commits, pushes, etc.)
    router.jsonResponse(app, "/github", getInfo);
}
