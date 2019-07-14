
module.exports = function(sequelize, DataTypes) {

    // Creates a "Users" model that matches up with DB
    var Users = sequelize.define("users", {
        userId: DataTypes.STRING,
        login: DataTypes.STRING,
        location: DataTypes.STRING,
        favorites: DataTypes.STRING,
        preferences: DataTypes.BOOLEAN,
        has_preferences: {
            type: DataTypes.STRING,
            defaultValue: false
        }
    });

    return Users;
}


