var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Location = require('../../../models').Location;
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
      var search_location = req.query.location.toLowerCase();
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + search_location + '&key=AIzaSyDvKMInDzd7n_avQqlsflQwGxhllW-fhlM';
      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        var lat = json.results[0].geometry.location.lat;
        var lng = json.results[0].geometry.location.lng;
        eval(pry.it)
        Location.findOrCreate({
          where: { name: search_location},
          defaults: { latitude: lat, longitude: lng}
        })
        .then(location => {
          var url = 'https://api.darksky.net/forecast/' + '80ddbb9666791f550fbdf293adcd6bae/' + lat + ',' + lng;
          fetch(url)
          .then(response => {
            return response.json();
          })
          .then(response => {
            res.status(200).send(response);
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
