pry = require('pryjs');
var fetch = require('node-fetch');
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.Favorite, { foreignKey: 'locationId' });
  };
};
