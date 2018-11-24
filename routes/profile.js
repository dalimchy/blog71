var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();

const User = require('../models/User');
////GET PROFILE PAGE =============>
router.get('/', function(req, res, next) {
  if (req.session.login) {
      if(req.session.user_avatar == "avatar.jpg"){
        if(req.session.gender == "male"){
          req.session.user_avatar = "male_avatar.svg";
        }
        else{
          req.session.user_avatar = "female_avatar.svg";
        }
      }
        
      User.findOne({_id:req.session.user_id},(err,result)=>{
        if(err){
          console.log(err);
        }else{
              var res_data = {
                  title: "Profile",
                  success: req.session.success,
                  user_id: req.session.user_id,
                  frist_name: result.frist_name,
                  last_name: result.last_name,
                  user_name: result.name,
                  user_email: result.email,
                  user_avatar: req.session.user_avatar,
                  cover_photo: req.session.cover_photo,
                  user_phone: result.phone,
                  user_type: result.type,
                  gender: result.gender,
                  company: result.company,
                  about_me: result.about_me,
                  nid_number: result.nid_number,
                  home_address: result.home_address,
                  bio: result.bio,
                  join_date: result.join_date,
                  moment: moment,
                  _:_,
                  has_login: true,
                };
                res.render("profile", res_data);
        }
      });
  } else {
    res.redirect('/login');
  }
  
});


module.exports = router;