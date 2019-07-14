// Dependencies
// =============================================================
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
    app.get("/api/users", function (req, res) { //GET route for getting all of thbe users
        
        db.Users.findAll({})
        .then(function(result) {
            res.json(result);
        })
    })

    app.get("/api/users/:userId", function (req, res) {

        db.Users.findAll({
            where: {
                userId: req.params.userId
            }
        }).then(function (result) {
            res.json(result)
        })
    })

    app.post("/api/users/:userId", function (req, res) {

        db.Users.create(req.body)
        .then(function (result) {
            res.json(result)
        })
    })
}