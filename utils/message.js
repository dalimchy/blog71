var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');

//Load user model
const User = require('../models/User');

//load conversation model
const Message = require('../models/Message');

var sendMessage =(data,callback)=>{

  var messageId = uuidv4();

  var resCallBack = {
      message_id: messageId,
      conversation_id : data.conversation_id,
      msg_body : data.msg_body,
      msg_sender_id : data.msg_sender_id,
      msg_seen_by : data.msg_seen_by

  };
	var sendMessage = new Message({
    message_id : messageId,
    conversation_id: data.conversation_id,
    msg_body: data.msg_body,
    msg_sender_id : data.msg_sender_id,
    msg_seen_by: data.msg_seen_by
  });

  sendMessage
  .save()
  .then(msg =>{
  	callback(resCallBack);
  })
  .catch(err => console.log(err));
}



module.exports = {sendMessage};