var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');

// User Registration
router.post('/', function(req, res, next){
  let password = req.body.password;
  let password_confirmation = req.body.password_confirmation;
  if (password == password_confirmation) {
    let password = bcrypt.hashSync(req.body.password, 10)
    let key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    User.create({
      email: req.body.email,
      password: password,
      api_key: key
    })
    .then(user => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify( {api_key: user.api_key} ));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
  }
  else {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send(JSON.stringify("Passwords do not match"));
  }
});

module.exports = router;
