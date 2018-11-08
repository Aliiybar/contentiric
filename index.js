const config = require('config'); // Logger
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const morgan = require('morgan'); // Logger
const express = require('express');
const app = express()
const port =  process.env.PORT || 3000

const users = require('./routes/user')
const auth = require('./routes/auth')


if(!config.get('jwtPrivateKey')){
   console.error('FATAL ERROR : jwtPrivateKey is not defined');
   process.exit(1);
}

mongoose.connect('mongodb://localhost/contentric')
    .then(()=> console.log('Connected to Mongo DB'))
    .catch(err=> console.error('Could not connect to Mongo DB...'));

app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);

// Configuration
// export NODE_ENV=development 
//console.log("Application Name : " + config.get('appName'));
//console.log("Mail Server Name : " + config.get('mailServer.serverAddress'));
// export contentiric_mail_password=Password123 // this env variable is mapped to mailServer.serverPassword in /config/custom-environment-variables file 
//console.log("Mail Server Password : " + config.get('mailServer.serverPassword'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
}

app.listen(port,()=>{
    console.log('Server started on port ' + port);
});