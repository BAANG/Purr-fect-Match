// Dependencies
// =============================================================

var db = require("../models");
var Favorite = require("../models/favorite.js");
var express = require('express');
var router = express.Router();

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

// =============================================================
router.post("/favorites/:id", function (req, res) {
    console.log(req.method, `Adding favorite for animal id ${req.params.id}`);
    Favorite.create({
        userId: 1, // TODO: Get the user from the auth
        animalId: req.params.id
    }).then(function (response) {
        res.sendStatus(200)
    }).catch(function (err) {
        console.error(err.original.sqlMessage)
        res.sendStatus(400)
    });
});

router.delete("/favorites/:id", function (req, res) {
    console.log(req.method, `Deleting favorite for animal id ${req.params.id}`);
    Favorite.destroy({
        where: {
            userId: 1, // TODO: Get the user from the auth
            animalId: req.params.id
        }
    }).then(function () {
        res.sendStatus(200)
    }).catch(function (err) {
        console.error(err.original.sqlMessage)
        res.sendStatus(400)
    });;
});

router.get("/favorites/:id", function (req, res) {
    console.log(req.method, `Getting favorite for animal id ${req.params.id}`);
    Favorite.findOne({
        where: {
            userId: 1, // TODO: Get the user from the auth
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

module.exports = router;

