var facebook  = require("fb");
var router    = require("./router.js");
var keys      = require("./keys.js");
var cache     = require("memory-cache");
var VALID_FOR = 86400000;

facebook.setAccessToken(keys.facebook_access_token);

function getAllInfo(callback) {
    var CACHE_CODE = "facebook-getAllInfo";
    var cached = cache.get(CACHE_CODE);
    if (cached)
        return callback(cached);

    facebook.api('me', function (data) {
        if (!data || data.error)
            return callback(data.error);
        cache.put(CACHE_CODE, data, VALID_FOR);
        callback(data);
    });
}

function basicInfo(callback) {
    getAllInfo(function (data) {
        callback({
            name: data["name"],
            gender: data["gender"],
            birthdate: data["birthday"],
            currentlocation: data["location"]["name"],
            hometown: data["hometown"]["name"],
            relationship: data["relationship_status"],
            significantother: data["significant_other"]["name"]
        });
        //callback(data);
    });
}

exports.registerRoutes = function (app) {
    router.jsonResponse(app, "/me", basicInfo);
}
