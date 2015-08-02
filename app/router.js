exports.jsonResponse = function(app, path, getter) {
    app.use(path, function (req, res, next) {
        res.setHeader("Content-Type", "application/json");
        getter(function (data) {
            res.write(JSON.stringify(data, null, 4));
            res.end();
        });
    });
}

exports.htmlResponse = function(app, path, getter) {
    app.use(path, function (req, res, next) {
        res.setHeader("Content-Type", "text/html");
        getter(function (data) {
            res.write(data);
            res.end();
        });
    });
}
