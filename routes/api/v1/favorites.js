var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Location = require('../../../models').Location;
var Favorite = require('../../../models').Favorite;
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
      Location.findOrCreate({
        where: { name: req.body.location.toLowerCase()},
        defaults: { latitude: '45', longitude: '45'}
      })
      .then(location => {
        // eval(pry.it)
        Favorite.findOrCreate({
          where: {
            locationId: location[0].dataValues.id,
            userId: user.dataValues.id
          },
          attributes : ['userId', 'locationId']
        })
        .then(favorite => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send(JSON.stringify({ message: `${req.body.location} has been added to your favorites` }));
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
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify("Invalid API key"));
  });
});
module.exports = router;
