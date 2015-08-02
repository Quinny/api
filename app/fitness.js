var keys      = require("./keys.js");
var cache     = require("memory-cache");
var strava    = require("strava-v3");
var router    = require("./router.js");
var VALID_FOR = 86400000; // 1 day

function getActivities(callback) {
    var CACHE_CODE = "strava-getActivities";
    var cached = cache.get(CACHE_CODE);
    if (cached)
        return callback(cached);

    strava.athlete.listActivities({ "access_token": keys.strava_access_token, },
            function (err, data) {
                if (err)
                    callback(err);
                cache.put(CACHE_CODE, data, VALID_FOR);
                callback(data);
            });
}

getActivities(function(data) {
    console.log(data);
});
