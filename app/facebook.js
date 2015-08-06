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

    facebook.api(keys.facebook_uid,
    {
        fields: [
                    'name',
                    'relationship_status',
                    'significant_other',
                    'location',
                    'work',
                    'birthday',
                    'gender',
                    'hometown'
                ]
    },
    function (data) {
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
            current_location: data["location"]["name"],
            hometown: data["hometown"]["name"],
            relationship: data["relationship_status"],
            significant_other: data["significant_other"]["name"]
        });
    });
}

function workInfo(callback) {
    getAllInfo(function (data) {
        callback(data.work.map(function (w) {
            return {
                position: w['position']['name'],
                employer: w['employer']['name'],
                location: w['location']['name'],
                start_date: w['start_date'],
                end_date: w['end_date']
            };
        }));
    });
}

exports.registerRoutes = function (app) {
    // end-point: /me/work
    // Employment history
    router.jsonResponse(app, "/me/work", workInfo);

    // end-point: /me
    // Basic information about me pulled from facebook
    router.jsonResponse(app, "/me", basicInfo);
}
