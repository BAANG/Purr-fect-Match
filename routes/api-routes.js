// Dependencies
// =============================================================

var db = require("../models");

// Routes
// =============================================================

module.exports = function (app) {
    app.get("/api/users", function (req, res) { //GET route for getting all of thbe users

        db.Users.findAll({})
            .then(function (result) {
                res.json(result);
            })
    });

    app.get("/api/users/:userId", function (req, res) {

        db.Users.findAll({
            where: {
                userId: req.params.userId
            }
        }).then(function (result) {
            res.json(result)
        })
    });

    app.post("/api/users/:userId", function (req, res) {

        db.Users.create(req.body)
            .then(function (result) {
                res.json(result)
            })
    });


    // =============================================================
    app.post("/favorites/:id/:user", function (req, res) {
        console.log(req.method, `Adding favorite for animal id ${req.params.id}`);
        // console.log(req.params)
        // console.log(req)
        console.log('this is the req.body', req.body)
        var userId = req.body.UserId;
        var animalId = req.body.animalId;

        db.Favorites.create({
            UserId : userId,
            animalId : animalId
        })
        .then(function (response) {
            res.sendStatus(200)
        }).catch(function (err) {
            console.error(err.original.sqlMessage)
            res.sendStatus(400)
        });
    });

    app.delete("/favorites/:id/:user", function (req, res) {
        console.log(req.method, `Deleting favorite for animal id ${req.params.id}`);
        db.Favorites.destroy({
            where: {
                UserId: req.params.user,
                animalId: req.params.id
            }
        }).then(function () {
            res.sendStatus(200)
        }).catch(function (err) {
            console.error(err.original.sqlMessage)
            res.sendStatus(400)
        });;
    });

    app.get("/favorites/:id/:user", function (req, res) {
        console.log(req.method, `Getting favorite for animal id ${req.params.id}`);
        db.Favorites.findOne({
            where: {
                userId: req.params.user, // TODO: Get the user from the auth
                animalId: req.params.id
            }
        }).then(function (response) {
            res.json({
                isFavorite: response != null
            });
        }).catch(function (err) {
            console.error(err.original.sqlMessage)
            res.sendStatus(400)
        });
    });
}


