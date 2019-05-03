pry = require('pryjs');


class Forecast {
  constructor(data) {
    this.data = data;
  }

  currentWeather(location) {
    var currentWeather = {
      "location": location,
      "current_weather": {
        "summary": this.data.currently.summary,
        "icon": this.data.currently.icon,
        "precipIntensity": this.data.currently.precipIntensity,
        "precipProbability": this.data.currently.precipProbability,
        "temperature": this.data.currently.temperature,
        "humidity": this.data.currently.humidity,
        "pressure": this.data.currently.pressure,
        "windSpeed": this.data.currently.windSpeed,
        "windGust": this.data.currently.windGust,
        "windBearing": this.data.currently.windBearing,
        "cloudCover": this.data.currently.cloudCover,
        "visibility": this.data.currently.visibility
      }
    }
    return currentWeather
  }
}
module.exports = Forecast;
