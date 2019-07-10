// Dependencies
// =============================================================

var Sequelize = require("sequelize");
var db = require("../config/connection.js");

// Creates a "Users" model that matches up with DB
var Users = db.define("users", {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    location: Sequelize.STRING,
    favorites: Sequelize.STRING,
    preferences: Sequelize.STRING,
    has_preferences: Sequelize.BOOLEAN
});

// Syncs with DB
Users.sync();

// Makes the Users Model available for other files (will also create a table)
module.exports = Users;
