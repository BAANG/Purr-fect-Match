

module.exports = function(sequelize, DataTypes) {

    // Creates a "Users" model that matches up with DB
    var Users = sequelize.define("Users", {
        UserId: DataTypes.STRING,
        login: DataTypes.STRING,
        location: DataTypes.STRING,
        favorites: DataTypes.STRING,
        preferences: DataTypes.STRING,
        has_preferences: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    // Users.associate = function(models) {
    //     Users.hasMany(models.Favorites, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     })
    // }

    return Users;
}


