const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/routes')(app); // we send app as parameter to function
require('./startup/db')();
require('./startup/config')(); // it's a function and we call it by ()
require('./startup/validation')();

const port =  process.env.PORT || 3000

app.listen(port,()=>{
    winston.silly('Server started on port ' + port);
});