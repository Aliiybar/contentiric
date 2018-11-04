const express = require('express');
const Joi = require('joi');

const loginSchema = {
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required()
};

const router = express.Router();

router.post('/login', (req, res) => {
    const { error } = Joi.validate(req.body, loginSchema);
    if(error) return res.status(400).send(error.details[0].message);
    
    // login
    res.send('OK');
});

module.exports = router;