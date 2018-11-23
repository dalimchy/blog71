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
	User.update({ _id: data },{ name: 'Golam Rabbani' }, function(err, res){
		if(err){
			callback({status: false, error: err});
		}else{
			callback({status:'success', result:res});
		}
	});
}



module.exports = {update_profile};