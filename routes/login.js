var express = require('express');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var router = express.Router();


/* GET login page. */
router.get('/', function (req, res, next) {
    if (req.session.login) {
        res.redirect('/dashboard');
    } else {
        var data = { 
            title: 'Login | Blog24', 
            errors: false 
        }
        res.render('sign_in', data);
    }
});

module.exports = router;
