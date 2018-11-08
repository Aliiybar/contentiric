const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    const config = {
        autoIndex: false,
        useNewUrlParser: true,
      };
    mongoose.connect('mongodb://localhost/contentric', { useNewUrlParser: true })
    .then(()=> winston.info('Connected to Mongo DB'));

    mongoose.set('useCreateIndex', true)
}