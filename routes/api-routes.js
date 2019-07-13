// Dependencies
// =============================================================
// var User = require("../models/users.js");
var express = require('express');
var router = express.Router();

var favorites = []

// Routes
// =============================================================
router.post("/favorites/:id", function (req, res) {
    console.log(req.method, `Adding favorite for animal id ${req.params.id}`);
    favorites.push(req.params.id)
    res.sendStatus(200)
})

router.delete("/favorites/:id", function (req, res) {
    console.log(req.method, `Deleting favorite for animal id ${req.params.id}`);
    favorites = favorites.filter(id => id != req.params.id)
    res.sendStatus(200)
})

router.get("/favorites/:id", function (req, res) {
    console.log(req.method, `Getting favorite for animal id ${req.params.id}`);
    res.json({
        isFavorite: favorites.includes(req.params.id)
    })
})

module.exports = router;