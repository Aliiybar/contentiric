const config = require('config');;
const Joi = require('joi');
const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
    siteId: {
        type:Schema.Types.ObjectId,
        required:true
    },
    registrationEmailConfirmation: {
        type:Boolean,
        required:true

    },
    loginAfterRegistration :{
        type:Boolean,
        required:true
    },
});

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema );
function validateSetting(settings){
    const schema = {
        siteId:Joi.ObjectId().required(),
        registrationEmailConfirmation:Joi.boolean().required(),
        loginAfterRegistration: Joi.boolean().required()
    }
    return Joi.validate(settings, schema);
}

exports.SiteSettings = SiteSettings;
exports.validateSiteSettings = validateSetting;