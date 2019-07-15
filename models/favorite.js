

module.exports = function (sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorites", {
        animalId: DataTypes.STRING,
        UserId: DataTypes.STRING
        
    });

    return Favorite;
};
