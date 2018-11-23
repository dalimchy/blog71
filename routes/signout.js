var express = require('express');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var router = express.Router();


/* Signout. */
router.get('/', function (req, res, next) {
    if(req.session.login){
        req.session.destroy();
        res.redirect('/');
    }
});

module.exports = router;
