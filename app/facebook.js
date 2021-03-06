const facebook  = require("fb");
const router    = require("./router.js");
const keys      = require("./keys.js");
const cache     = require("memory-cache");
const alerter   = require("./alerter.js");
const VALID_FOR = 86400000;
facebook.setAccessToken(keys.facebook_access_token);
const errorResponse = {
    error: "500",
    message: "Error getting facebook data!  Monkeys are being dispatched"
};


function getAllInfo(callback) {
    const CACHE_CODE = "facebook-getAllInfo";
    const cached = cache.get(CACHE_CODE);
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
                    'hometown',
                    'education'
                ]
    },
    function (data) {
        if (!data || data.error) {
            alerter.send("Facebook API Error!",
                         "The error is: " + JSON.stringify(data.error) + "\n" +
                         "The problem is most likely that the access token " +
                         "expired");
            return callback(data);
        }
        cache.put(CACHE_CODE, data, VALID_FOR);
        callback(data);
    });
}

function basicInfo(callback) {
    getAllInfo(function (data) {
        if (data.error)
            return callback(errorResponse);
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
        if (data.error)
            return callback(errorResponse);
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

function schoolInfo(callback) {
    getAllInfo(function (data) {
        if (data.error)
            return callback(errorResponse);
        callback(data.education.map(function (e) {
            ret = {};
            ret['level'] = e['type'];
            if ('concentration' in e)
                ret['degree'] = e['concentration'][0]['name'];
            ret['class'] = e['year']['name'];
            ret['school'] = e['school']['name'];
            return ret;
        }));
    });
}

exports.registerRoutes = function (app) {
    // end-point: /me/work
    // Employment history
    router.jsonResponse(app, "/me/work", workInfo);

    // end-point: /me/school
    // Education history
    router.jsonResponse(app, "/me/school", schoolInfo);

    // end-point: /me
    // Basic information about me pulled from facebook
    router.jsonResponse(app, "/me", basicInfo);
}
