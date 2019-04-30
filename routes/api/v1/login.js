var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');
pry = require('pryjs')

// User Login
router.post('/', function(req, res, next){
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      let password = req.body.password
      let user_password = user.dataValues.password
      if (bcrypt.compareSync(password, user_password)) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify({ api_key: user.dataValues.api_key }))
      }
      else {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send(JSON.stringify("Password does not match"));
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

module.exports = router;
