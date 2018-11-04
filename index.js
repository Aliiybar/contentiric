const express = require('express');
const morgan = require('morgan'); // Logger

const app = express()
const port =  process.env.PORT || 3000

app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(express.json());

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
}

app.listen(port,()=>{
    console.log('Server started on port ' + port);
});