var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Location = require('../../../models').Location;
var Favorite = require('../../../models').Favorite;
var Forecast = require('../../../public/forecast');
var fetch = require('node-fetch');
pry = require('pryjs');

// Save Favorite Location
router.post('/', function(req, res, next){
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
      var search_location = req.body.location.toLowerCase();
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + search_location + '&key=AIzaSyDvKMInDzd7n_avQqlsflQwGxhllW-fhlM';
      fetch(url)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        var lat = json.results[0].geometry.location.lat;
        var lng = json.results[0].geometry.location.lng;
        Location.findOrCreate({
          where: { name: search_location},
          defaults: { latitude: lat, longitude: lng}
        })
        .then(location => {
          Favorite.findOrCreate({
            where: {
              locationId: location[0].dataValues.id,
              userId: user.dataValues.id
            },
            attributes : ['userId', 'locationId']
          })
          .then(favorite => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify({ message: `${req.body.location} has been added to your favorites` }));
          })
          .catch(error => {
            res.setHeader("Content-Type", "application/json");
            res.status(500).send({ error });
          });
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({ error })
        });
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send(JSON.stringify("Invalid location"));
      })
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify("Invalid API key"));
  });
});

// Delete Favorite Location
router.delete('/', function(req, res, next){
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
      Location.findOne({
        where: {
          name: req.body.location.toLowerCase()
        }
      })
      .then(location => {
        Favorite.destroy({
          where: {
            userId: user.dataValues.id,
            locationId: location.dataValues.id
          }
        })
        .then(favorite => {
          if (favorite == 0) {
            res.setHeader("Content-Type", "application/json");
            res.status(500).send(JSON.stringify("User does not have location saved"));
          }
          else {
            res.setHeader("Content-Type", "application/json");
            res.status(204).send({ favorite });
          }
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({ error });
        });
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error });
      });
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify("Invalid API key"));
  })
});

// List Favorite Locations
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
      Location.findAll({
        include: [
          {
            model: Favorite, as: Favorite.tableName,
            where: { 'userId': user.dataValues.id }
          }
        ]
      })
      .then(location => {
        var i;
        var currentForecasts = []
        for (i = 0; i < location.length; i++) {
          const forecast = new Forecast(location[i].dataValues.latitude, location[i].dataValues.longitude)
          forecast.singleForecast()
          currentForecasts.push(forecast)
        }
        eval(pry.it)
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error });
      });
    }
  })
  .catch(error => {
    eval(pry.it)
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify("Invalid API key"));
  })
})
module.exports = router;
