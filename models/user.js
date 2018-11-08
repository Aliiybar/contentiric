const config = require('config');;
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        minlength:1,
        maxlength:50
    },
    lastName :{
        type:String,
        required:true,
        minlength:1,
        maxlength:50
    },
    email: {
        type:String,
        required:true,
        minlength:1,
        maxlength:255,
        unique:true
    },
    password: {
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id, firstName : this.firstName, lastName: this.lastName, email: this.email}, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User', userSchema );
function validateUser(user){
    const schema = {
        firstName:Joi.string().min(1).max(50).required(),
        lastName: Joi.string().min(1).max(50),
        email:Joi.string().min(1).max(255).required().email,
        password:Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;