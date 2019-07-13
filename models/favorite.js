// Dependencies
// =============================================================
var Sequelize = require("sequelize");
var db = require("../config/connection.js");
var User = require("../models/users.js");

// Creates a "Favorite" model that matches up with DB
var Favorite = db.define("favorite", {
    animalId: Sequelize.STRING
});
Favorite.belongsTo(User)

// Syncs with DB
Favorite.sync();

// Makes the Favorite Model available for other files (will also create a table)
module.exports = Favorite;
