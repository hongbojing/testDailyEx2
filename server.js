var express = require('express'); // call express
var app = express();
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');

// app configuration
// use body parser so we can grab information from post request
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// configure our app to handle cors requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database ( hosted on modulus.io )
mongoose.connect(config.database);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// routes for our api
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// main catch all route
// send users to frontend
// has to be registered after api routes
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// start the server
app.listen(config.port);
console.log('haha first time to finish the exercise ' + config.port);