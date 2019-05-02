const express = require('express')
const app = express();
const mongoose = require('mongoose');
const Credential = require('./models/credential');
const bodyParser = require('body-parser');
const dbpw = 'DfMV07AMhiU3DRXL';

console.log("Server Running");

// Define routes
const credentialRoute = require('./routes/credentialsRoutes');

// Setup DB Connection
mongoose.connect('mongodb+srv://node-admin:' + dbpw + '@cluster0-9x9xv.mongodb.net/credentials?retryWrites=true', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

// Setup bodyParsing
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json({}));

// Define middleware for endpoint
app.use('/credentials', credentialRoute);

// Handle every request that didn't have a route defined
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    // Forward error
    next(error);
});

// Handle errors thrown by anything else in the application 
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            // Errors should always have a message
            RoutingError: error.message
        }
    })
});

module.exports = app;
