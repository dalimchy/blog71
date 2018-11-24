var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const _ = require('lodash');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//Load user model
const User = require('../models/User');

var update_profile =(data,callback)=>{
	var updateNewData = {
		name: data.userFullname,
		frist_name: data.frist_name,
		last_name: data.last_name,
		home_address: data.home_address,
		about_me: data.about_me,
		phone: data.mobile_number
	};
	User.updateOne({ _id: data.user_id },updateNewData, function(err, res){
		if(err){
			callback({status: false, error: err});
		}else{
			callback({status:'success', result:updateNewData});
		}
	});
}



module.exports = {update_profile};