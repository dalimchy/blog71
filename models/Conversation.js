const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const conversationSchema = new Schema({
    conversation_id:{
        type:String,
        required:true
    },
    participants:{
        type:[String],
        required:true
    },
    conv_type:{
        type:String,
        required:true
    },
    conv_title:{
        type:String
    },
    mute_by:{
        type:[String]
    },
    conv_avatar:{
        type:String
    },
    create_by:{
        type:String,
        required:true
    },
    create_at:{
        type:Date,
        default:Date.now
    }

});
module.exports = Conversation = mongoose.model('conversations',conversationSchema);
