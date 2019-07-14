
module.exports = function(sequelize, DataTypes) {

    // Creates a "Users" model that matches up with DB
    var Users = sequelize.define("Users", {
        userId: DataTypes.STRING,
        login: DataTypes.STRING,
        location: DataTypes.STRING,
        favorites: DataTypes.STRING,
        preferences: DataTypes.STRING,
        has_preferences: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Users;
}


