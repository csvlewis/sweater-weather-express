var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Location = require('../../../models').Location;
var Forecast = require('../../../public/forecast');
const fetch = require('node-fetch');
pry = require('pryjs');

// City Forecast
router.get('/', function(req, res, next){
  User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(user => {
    if (user == null) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify("Invalid API key"));
    }
    else {
      const search_location = req.query.location;
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + search_location + '&key=AIzaSyDvKMInDzd7n_avQqlsflQwGxhllW-fhlM';
      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        var lat = json.results[0].geometry.location.lat;
        var lng = json.results[0].geometry.location.lng;
        Location.findOrCreate({
          where: { name: search_location.toLowerCase()},
          defaults: { latitude: lat, longitude: lng}
        })
        .then(location => {
          var forecast = location[0].forecast()
          .then(forecast => {
            var newForecast = new Forecast(forecast)
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(newForecast.detailedForecast(search_location))
          })
          .catch(error => {
            res.setHeader("Content-Type", "application/json");
            res.status(500).send({ error })
          })
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({ error })
        });
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error })
      });
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify("Invalid API key"));
  })
});

module.exports = router;
