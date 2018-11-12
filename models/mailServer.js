const config = require('config');;
const Joi = require('joi');
const mongoose = require('mongoose');

const mailServerSchema = new mongoose.Schema({
    siteId: {
        type:Schema.Types.ObjectId,
        required:true
    },
    name: {
        type:String,
        required:true,
        minlength:1,
        maxlength:255
    },    
    emailServerAddress: {
        type:String,
        required:true,
        minlength:1,
        maxlength:255
    },
    emailServerUsername: {
        type:String,
        required:true,
        minlength:1,
        maxlength:255
    },    
    emailServerPassword: {
        type:String,
        required:true,
        minlength:1,
        maxlength:1255
    },    
    emailServerPort: {
        type:Number,
        required:true
    },  
    emailServerUseSSL :{
        type:Boolean,
        required:true
    },
    emailFromName: {
        type:String,
        required:true,
        minlength:1,
        maxlength:1255
    } ,    
    emailFromAddress: {
        type:String,
        required:true,
        minlength:1,
        maxlength:1255
    }     
});

const MailServer = mongoose.model('MailServer', mailServerSchema );
function validateSetting(settings){
    const schema = {
        siteId:Joi.ObjectId().required(),
        name:Joi.string().min(1).max(255).required(),
        emailServerAddress:Joi.string().min(1).max(255).required(),
        emailServerUsername:Joi.string().min(5).max(255).required(),
        emailServerPassword:Joi.string().min(5).max(1255).required(),
        emailServerPort:Joi.number().required(),
        emailServerUseSSL:Joi.boolean().required(),
        emailFromName:Joi.string().min(1).max(255).required(),
        emailFromAddress:Joi.string().min(1).max(255).required(),
    }
    return Joi.validate(settings, schema);
}

exports.MailServer = MailServer;
exports.validateMailServer = validateSetting;