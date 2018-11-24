var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.login) {
    console.log(req.session.user_avatar);
    if(req.session.user_avatar == "avatar.jpg"){
      if(req.session.gender == "male"){
        req.session.user_avatar = "male_avatar.svg";
      }
      else{
        req.session.user_avatar = "female_avatar.svg";
      }
    }

    console.log(req.session.user_avater);
    var res_data = {
      title: "Dashboard",
      success: req.session.success,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
      user_email: req.session.user_email,
      user_avatar: req.session.user_avatar,
      user_phone: req.session.user_phone,
      user_type: req.session.user_type,
      moment: moment,
      _:_,
      has_login: true,
    };
    res.render("dashboard", res_data);
  } else {
    res.redirect('/login');
  }
  
});

module.exports = router;
