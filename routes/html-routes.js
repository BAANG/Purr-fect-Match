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


    // res.send("Log in page goes here.")
    // return;
    res.render("login")
})

router.get("/main", function (req, res) {
    console.log(req.method, "request completed.");

    res.render("index")
})

router.get("/pets/:id", function (req, res) {
    console.log(req.method, "request completed.");

    var petfinderData = getAnimalInfo(req.params.id)
    // TODO: Insert API request data per the profile to populate the handlebars object
    // Ideally, petID will be retrieved on click and that value was generated on the initial GET request from Petfinder.
    res.render("profile", petfinderData)
})

router.get("/favorites", function (req, res) {
    console.log(req.method, "request completed.");
    Favorite.findAll({
        where: {
            userId: '00uw0cht1ElgY4oME356', // TODO: Get the user from the auth
        }
    }).then(function (favorites) {
        var animalInfoPromises = favorites.map(favorite => getAnimalInfo(favorite.animalId));
        Promise.all(animalInfoPromises).then(function (animalInfo) {
            console.log(animalInfo)
            res.render("favorites", { animals: animalInfo });
        });
    });
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

// function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }