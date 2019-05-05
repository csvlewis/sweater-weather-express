pry = require('pryjs');


class Forecast {
  constructor(data) {
    this.data = data;
  }

  detailedForecast(location) {
    var detailedForecast = {
      "location": location,
      "currently": {
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
          "visibility": this.data.currently.visibility,
        },
      "hourly": hourlyForecasts(this.data.hourly),
      "daily": dailyForecasts(this.data.daily)
    }
    return detailedForecast
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

function hourlyForecasts(hourly_data) {
  var hourly_array = [{ "summary": hourly_data.summary, "icon": hourly_data.icon }]
  for (i = 1; i < 9; i++) {
    var single_forecast = {
      "data": [
        {
        "time": hourly_data.data[i].time,
        "summary": hourly_data.data[i].summary,
        "icon": hourly_data.data[i].icon,
        "precipIntensity": hourly_data.data[i].precipIntensity,
        "precipProbability": hourly_data.data[i].precipProbability,
        "temperature": hourly_data.data[i].temperature,
        "humidity": hourly_data.data[i].humitidy,
        "pressure": hourly_data.data[i].pressure,
        "windSpeed": hourly_data.data[i].windSpeed,
        "windGust": hourly_data.data[i].windGust,
        "windBearing": hourly_data.data[i].windBearing,
        "cloudCover": hourly_data.data[i].cloudCover,
        "visibility": hourly_data.data[i].visibility
        },
      ]
    }
    hourly_array.push(single_forecast)
  }
  return hourly_array
}

function dailyForecasts(daily_data) {
  var daily_array = [{ "summary": daily_data.summary, "icon": daily_data.icon }]
  for (i = 0; i < 7; i++) {
    var single_forecast = {
      "data": [
        {
          "time": daily_data.data[i].time,
          "summary": daily_data.data[i].summary,
          "icon": daily_data.data[i].wind,
          "sunriseTime": daily_data.data[i].sunriseTime,
          "sunsetTime": daily_data.data[i].sunsetTime,
          "precipIntensity": daily_data.data[i].precipIntensity,
          "precipIntensityMax": daily_data.data[i].precipIntensityMax,
          "precipIntensityMaxTime": daily_data.data[i].precipIntensityMaxTime,
          "precipProbability": daily_data.data[i].precipProbability,
          "precipType": daily_data.data[i].precipType,
          "temperatureHigh": daily_data.data[i].temperatureHigh,
          "temperatureLow": daily_data.data[i].temperatureLow,
          "humidity": daily_data.data[i].humidity,
          "pressure": daily_data.data[i].pressure,
          "windSpeed": daily_data.data[i].windSpeed,
          "windGust": daily_data.data[i].windGust,
          "cloudCover": daily_data.data[i].cloudCover,
          "visibility": daily_data.data[i].visibility,
          "temperatureMin": daily_data.data[i].temperatureMin,
          "temperatureMax": daily_data.data[i].temperatureMax
        }
      ]
    }
    daily_array.push(single_forecast)
  }
  return daily_array
}
module.exports = Forecast;
