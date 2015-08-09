const keys      = require("./keys.js");
const cache     = require("memory-cache");
const strava    = require("strava-v3");
const router    = require("./router.js");
const VALID_FOR = 86400000; // 1 day

function getActivities(callback) {
    const CACHE_CODE = "strava-getActivities";
    const cached = cache.get(CACHE_CODE);
    if (cached)
        return callback(cached);

    strava.athlete.listActivities(
    {
        "access_token": keys.strava_access_token,
    },
    function (err, data) {
        if (err)
            callback(err);
        cache.put(CACHE_CODE, data, VALID_FOR);
        callback(data);
    });
}

exports.registerRoutes = function(app) {
    // end-point: /fitness
    // My latests runs recorded from strava
    router.jsonResponse(app, "/fitness", getActivities);
}
