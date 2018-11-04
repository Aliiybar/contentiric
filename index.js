const config = require('config'); // Logger
const morgan = require('morgan'); // Logger
const express = require('express');

const authRoutes = require('./routes/authentication')

const app = express()
const port =  process.env.PORT || 3000

app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', authRoutes);

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