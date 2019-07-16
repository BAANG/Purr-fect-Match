// Dependencies
// =============================================================
var express = require('express');
var router = express.Router();
var Favorite = require("../models/favorite.js");
var axios = require("axios")
var petfinderAuth = require("../controllers/petfinder-auth")
var db = require('../models')

// Routes
// =============================================================
router.get("/", function (req, res) {
    console.log(req.method, "request completed.");

    res.render("login")
})

router.get("/main", function (req, res) {
    console.log(req.method, "request completed.");

    res.render("index")
})

router.get("/pets/:id", function (req, res) {
    console.log(req.method, "request completed.");


    var petfinderData = getAnimalInfo(req.params.id)

    res.render("profile", petfinderData)
})


router.get("/test", function (req, res) {
    console.log(req.method, "request completed.");
    res.send("Hello World")
})

function getAnimalInfo(id) {
    return axios({
        url: `https://api.petfinder.com/v2/animals/${id}`,
        method: "GET",
        headers: petfinderAuth
    }).then(function (response) {
        return response.data.animal
    });
}

module.exports = router;
