var express = require('express');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.login) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
  
});

module.exports = router;
