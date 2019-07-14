// Dependencies
// =============================================================
var db = require("../models/");

// Routes
// =============================================================
module.exports = function(app) {
    app.get("/api/users", function (req, res) {
        db.Users.findAll({})
        .then(function(result) {
            res.json(result);
        })
    })
}