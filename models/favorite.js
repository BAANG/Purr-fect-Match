

module.exports = function (sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorites", {
        animalId: DataTypes.STRING,
        UserId: DataTypes.STRING
        
    });

    // Favorite.associate = function(models) {
    //     Favorite.belongsTo(models.Users, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     })
    // }

    return Favorite;
};
