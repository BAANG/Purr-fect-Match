// Dependencies
// =============================================================
var express = require('express');
var router = express.Router();
var Favorite = require("../models/favorite.js");
var axios = require("axios")
var petfinderAuth = require("../controllers/petfinder-auth")

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

    var petfinderData;
    // TODO: Insert API request data per the profile to populate the handlebars object
    // Ideally, petID will be retrieved on click and that value was generated on the initial GET request from Petfinder.
    res.render("profile", petfinderData)
})

router.get("/favorites", function (req, res) {
    console.log(req.method, "request completed.");
    Favorite.findAll({
        where: {
            userId: 1, // TODO: Get the user from the auth
        }
    }).then(function (favorites) {
        var animalInfoPromises = favorites.map(favorite => getAnimalInfo(favorite.animalId));
        Promise.all(animalInfoPromises).then(function (animalInfo) {
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
        headers: {
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI0MGNjOGVmYTIzYmM4ZTViZTBjNjZhNzA1N2VlNDQ3MmUxZTFiNzBlNDNjZGZkNGZhMzdmZWY3NjcxZTYyNTk1NGE3YmFlMTc4MjJlZmVjIn0.eyJhdWQiOiJ5Y3FKMXk0dDF0eHMyVG03OTU5WHJMbHhITm9FejBZTm9DQzVZSVk4b0loM3Y0NlNZaCIsImp0aSI6IjI0MGNjOGVmYTIzYmM4ZTViZTBjNjZhNzA1N2VlNDQ3MmUxZTFiNzBlNDNjZGZkNGZhMzdmZWY3NjcxZTYyNTk1NGE3YmFlMTc4MjJlZmVjIiwiaWF0IjoxNTYzMDgxMTQ0LCJuYmYiOjE1NjMwODExNDQsImV4cCI6MTU2MzA4NDc0NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.HzL--ZF_YPE0BEFuX57mShuPtLl9PbKcgs6oDfU0rRWNtujXRo35gR7dS-_JUm5fMM5T4NQGN5X0FyetRHmDR-wA6DZQKKcSptnlHBHtrnXpj5Ux0mZ3_ZQNCzEMRKW1yue4fywJ_H7VkSqqCxvs-b7CRPGegzpKID_3vw0TJTVJlB_Uzdz6H1kyg5A3lb5a4FIBdVRes9dS8TkYSZopugZav9uVyG9NTyBLTTy7pjZxSBAUqlBNbLOfE_r07xhaVx8U9akt1x6ryVxMtnaYvCaC9E418GCFka9e9DxUAO2z1QK-gVmH1BIEP0zEvYVl882ERYRZxgJmh7wx_JKgFg"
        }
    }).then(function (response) {
        return response.data.animal
    });
}

module.exports = router;