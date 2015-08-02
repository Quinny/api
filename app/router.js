exports.jsonResponse = function(app, path, getter) {
    app.use(path, function (req, res, next) {
        console.log(path);
        res.setHeader("Content-Type", "application/json");
        getter(function (data) {
            res.write(JSON.stringify(data, null, 4));
            res.end();
        });
    });
}
