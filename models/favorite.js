'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, { foreignKey: 'userId' }),
    Favorite.belongsTo(models.Location, { foreignKey: 'locationId' });
  };
  return Favorite;
};
