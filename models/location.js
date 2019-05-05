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
  
  Location.prototype.forecast = function() {
    var url = 'https://api.darksky.net/forecast/' + '80ddbb9666791f550fbdf293adcd6bae/' + this.latitude + ',' + this.longitude;
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error;
    });
  };

  return Location;
};
