const assert = require("assert");
const http   = require("http");
const host   = "http://localhost:8000";

function getJSON(url, callback) {
    http.get(url, function(res) {
        var body = "";
        res.on("data", function (d) {
            body += d;
        });

        res.on("end", function() {
            callback(false, JSON.parse(body));
        });
    }).on("error", function (err) {
        callback(err, {});
    });
}

function testArrayResponse(endpoint, fields) {
    console.log("Testing: " + endpoint);
    getJSON(host + endpoint, function (err, data) {
        assert(!err, "Error on request\n" + err);
        assert(data.length > 1, "No events pulled");
        for (var i = 0; i < fields.length; ++i) {
            assert(fields[i] in data[0], fields[i] + " not found in response");
        }
    });
}

function testObjectResponse(endpoint, fields) {
    console.log("Testing: " + endpoint);
    getJSON(host + endpoint, function (err, data) {
        assert(!err, "Error on request\n" + err);
        for (var i = 0; i < fields.length; ++i) {
            assert(fields[i] in data, fields[i] + " not found in response");
        }
    });
}

testArrayResponse("/fitness", ["id"]);
testArrayResponse("/github", ["id", "type"]);
testArrayResponse("/github/followers", ["id", "type", "login"]);
testArrayResponse("/github/following", ["id", "type", "login"]);
testObjectResponse("/me", ["name", "gender", "birthdate"]);
testArrayResponse("/me/school", ["level", "class", "school"]);
testArrayResponse("/me/work", ["position", "employer", "location", "start_date"]);
testArrayResponse("/posts", ["title", "content", "author"]);
