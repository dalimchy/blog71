module.exports = function (io) {
  var _ = require('lodash');
  var app = require('express');
  var router = app.Router();
    var {update_profile} = require('./../utils/profile');
    var {create_conversations} = require('./../utils/conversation');
    var {send_Message,msg_history} = require('./../utils/message');
  
  io.on('connection', function (socket) {
    socket.join('1');
    // socket.join('bde4b452-0734-4aaf-b5c1-09cc12d7ab64');
    socket.on('login', function (userdata) {
      console.log('Socket Connected:',userdata)
      socket.join('navigate_2018_902770');
      socket.join(userdata.from);
      socket.handshake.session.userdata = userdata;
      socket.handshake.session.save();
      
    });

    socket.on('disconnect', function () {
      console.log('disconnect*********************',socket.handshake.session.confdata);
      if(socket.handshake.session.userdata){
        console.log(22,'socket.js',socket.handshake.session.userdata);
      }else{
        io.sockets.in('navigate_2018_902770').emit('logout', { userdata: socket.handshake.session.userdata });
        if (socket.handshake.session.userdata) {
          delete socket.handshake.session.userdata;
          socket.handshake.session.save();
        }
      }
      
    });

    socket.on('update_profile', function(data,callback){
      update_profile(data,function(result,err){
        if(err){
          callback(err);
        }else{
          callback(result);
        }
      });
    });

    socket.on('create_conversation', function(data,callback){
      create_conversations(data,function(result, err){
        if(err){
          callback(err);
        }else{
          socket.broadcast.emit('newConversation', result);
          callback(result);
          
        }
      });
    });

    socket.on('sendMessage', function(data,callback){
      send_Message(data, function(result, err){
        if(err){
          callback(err);
        }else{
          callback(result);
          socket.broadcast.emit('newMessage', result);
        }
      });
    });

    socket.on('get_conversation_history', function(data,callback){
      msg_history(data, function(result, err){
        if(err){
          callback(err);
        }else{
          callback(result);
        }
      });
    });
  });

  return router;
}
