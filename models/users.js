
module.exports = function(db, DataTypes) {

    // Creates a "Users" model that matches up with DB
    var Users = db.define("users", {
        userId: DataTypes.STRING,
        login: DataTypes.STRING,
        location: DataTypes.STRING,
        favorites: DataTypes.STRING,
        preferences: DataTypes.STRING,
        has_preferences: {
            type: DataTypes.STRING,
            defaultValue: false
        }
    });

    return Users;
}


