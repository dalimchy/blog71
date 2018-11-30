var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');

//Load user model
const User = require('../models/User');

//load conversation model
const Conversation = require('../models/Conversation');

var create_conversations =(data,callback)=>{

  var conversationId = uuidv4();

  var resCallBack = {
      conversation_id : conversationId,
      participants : data.participants,
      conv_type : data.conversation_type,
      create_by : data.create_by

  };
	var newConv = new Conversation({
    conversation_id: conversationId,
    participants: data.participants,
    conv_type : data.conversation_type,
    create_by: data.create_by
  });

  newConv.save().then(conv =>{
  	callback(resCallBack);
  })
  .catch(err => console.log(err));
}



module.exports = {create_conversations};