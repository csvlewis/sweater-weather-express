
var fetch = require('node-fetch');
'use strict';
require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.Favorite, { foreignKey: 'locationId' });
  };

  Location.prototype.forecast = function() {
    var url = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API + '/' + this.latitude + ',' + this.longitude;
    return new Promise(function (resolve, reject) {
      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        resolve(error);
      });
    })
  };

  return Location;
};
