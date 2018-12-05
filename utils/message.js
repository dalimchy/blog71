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

var send_Message =(data,callback)=>{

  var messageId = uuidv4();

  var resCallBack = {
      message_id: messageId,
      conversation_id : data.conversation_id,
      msg_body : data.msg_body,
      msg_sender_id : data.msg_sender_id,
      msg_seen_by : data.msg_seen_by,
      msg_sender_name :data.msg_sender_name,
      msg_sender_img : data.nsg_sender_img

  };
	var sendMessage = new Message({
    message_id : messageId,
    conversation_id: data.conversation_id,
    msg_body: data.msg_body,
    msg_sender_id : data.msg_sender_id,
    msg_sender_name :data.msg_sender_name,
    msg_sender_img : data.nsg_sender_img,
    msg_seen_by: data.msg_seen_by
  });

  sendMessage
  .save()
  .then(msg =>{
  	callback(resCallBack);
  })
  .catch(err => console.log(err));
}

var msg_history = (data,callback)=>{
  Message.find({conversation_id:data},(result,err)=>{
    if(err){
      callback(err);
    }else{
      callback(result);
    }
  });
}



module.exports = {send_Message,msg_history};