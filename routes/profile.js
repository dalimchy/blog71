var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();


////GET PROFILE PAGE =============>
router.get('/', function(req, res, next) {
  if (req.session.login) {
      if(req.session.user_avater == "avatar.jpg")
        if(req.session.gender == "male")
          req.session.user_avater = "male_avatar.svg";
        else
          req.session.user_avater = "female_avatar.svg";


    var res_data = {
      title: "Profile",
      success: req.session.success,
      user_id: req.session.user_id,
      frist_name: req.session.frist_name,
      last_name: req.session.last_name,
      user_name: req.session.user_name,
      user_email: req.session.user_email,
      user_avatar: req.session.user_avatar,
      cover_photo: req.session.cover_photo,
      user_phone: req.session.user_phone,
      user_type: req.session.user_type,
      gender: req.session.gender,
      company: req.session.company,
      about_me: req.session.about_me,
      nid_number: req.session.nid_number,
      home_address: req.session.home_address,
      bio: req.session.bio,
      join_date: req.session.join_date,
      moment: moment,
      _:_,
      has_login: true,
    };
    res.render("profile", res_data);
  } else {
    res.redirect('/login');
  }
  
});


module.exports = router;