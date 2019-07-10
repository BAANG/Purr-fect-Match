// Dependencies
// =============================================================
var express = require('express');
var router = express.Router();


// Routes
// =============================================================
router.get("/", function (req, res) {
    console.log(req.method, "request completed.");


    res.send("Log in page goes here.")
    return;
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

    res.send("Profile page goes here.")
    return;
    res.render("profile", petfinderData)
})

router.get("/favorites", function (req, res) {
    console.log(req.method, "request completed.");

    res.send("Favorites page goes here.")
    return;
    res.render("favorites")
})

router.get("/test", function (req, res) {
    console.log(req.method, "request completed.");


    res.send("Hello World")
})



module.exports = router;