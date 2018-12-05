const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const messageSchema = new Schema({
    message_id:{
        type:String,
        required:true
    },
    conversation_id:{
        type:String,
        required:true
    },
    msg_body:{
        type:String,
        required:true
    },
    msg_sender_id:{
        type:String,
        required:true
    },
    msg_sender_name:{
        type:String,
        required:true
    },
    msg_sender_img:{
        type:String
    },
    msg_seen_by:{
        type:[String]
    },
    create_at:{
        type:Date,
        default:Date.now
    }

});
module.exports = Message = mongoose.model('messages',messageSchema);
