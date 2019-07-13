// Dependencies
// =============================================================
var User = require("../models/users.js");
var Favorite = require("../models/favorite.js");
var express = require('express');
var router = express.Router();

// Routes
// =============================================================
router.post("/favorites/:id", function (req, res) {
    console.log(req.method, `Adding favorite for animal id ${req.params.id}`);
    Favorite.create({
        userId: 0, // TODO: Get the user from the auth
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
            userId: 0, // TODO: Get the user from the auth
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
            userId: 0, // TODO: Get the user from the auth
            animalId: req.params.id
        }
    }).then(function (response) {
        res.json({
            isFavorite: response != null
        }).catch(function (err) {
            console.error(err.original.sqlMessage)
            res.sendStatus(400)
        });
    });
});

module.exports = router;