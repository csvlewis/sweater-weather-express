pry = require('pryjs');

class Forecast {
  constructor (lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  singleForecast() {
    eval(pry.it)
  }
}

module.exports = Forecast;
