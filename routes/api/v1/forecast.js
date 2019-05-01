var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const fetch = require('node-fetch');
pry = require('pryjs')

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
      var search_location = req.url.split('=')[1].toLowerCase();
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + search_location + '&key=AIzaSyDvKMInDzd7n_avQqlsflQwGxhllW-fhlM';
      fetch(url)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        var lat = json.results[0].geometry.location.lat;
        var lng = json.results[0].geometry.location.lng;
        var url = 'https://api.darksky.net/forecast/' + '80ddbb9666791f550fbdf293adcd6bae/' + lat + ',' + lng;
        fetch(url)
        .then(function(response){
          return response.json();
        })
        .then(function(response){
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
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error })
  })
});

module.exports = router;
