var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const fetch = require('node-fetch');
pry = require('pryjs')

// City Forecast
router.get('/', function(req, res, next){
  let search_location = req.url.split('=')[1].toLowerCase();
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + search_location + '&key=AIzaSyDvKMInDzd7n_avQqlsflQwGxhllW-fhlM'
  fetch(url)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    let lat = json.results[0].geometry.location.lat
    let lng = json.results[0].geometry.location.lng
    var url = 'https://api.darksky.net/forecast/' + '80ddbb9666791f550fbdf293adcd6bae/' + lat + ',' + lng
    fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(response){
      res.status(200).send(response);
    });
  });
});

module.exports = router;
