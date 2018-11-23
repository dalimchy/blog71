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





module.exports = {update_profile};