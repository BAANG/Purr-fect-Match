// Dependencies
// =============================================================
var express = require('express');
var router = express.Router();


// Routes
// =============================================================
router.get("/", function (req, res) {
    console.log(req.method, "request completed.");


   res.render("index")
})

router.get("/test", function (req, res) {
    console.log(req.method, "request completed.");


   res.send("Hello World")
})



module.exports = router;