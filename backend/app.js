var express = require('express');
var bearerToken = require('express-bearer-token');
var app = express();
var pretty = require('express-prettify');
var mongoose = require('mongoose');
var config = require('./config');
var categoryController = require('./controllers/categorycontroller');
var budgetController = require('./controllers/budgetcontroller');
var managecontroller = require('./controllers/managecontroller');
var transactioncontroller = require('./controllers/transactioncontroller');
var dashboradcontroller = require('./controllers/dashboardcontroller');
var securitycontroller = require('./controllers/securitycontroller');
var jwt = require('jsonwebtoken');
var cors = require('cors')
var port = 3000;
mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnectionString());
app.set("secret", config.secretValue());
app.use(cors())
app.use(bearerToken());
app.use(function (req, res, next) { 
    var token = req.token;
    var path = req.path
    if (token) {
        jwt.verify(token, app.get('secret'), function (err, decoded) {
            if (err) {
                console.log('error');
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                console.log('next');
                req.decoded = decoded;
                next();
            }
        })
    } else if (path == '/api/authenticate' || path == '/api/signup') {
        next();
    } else {
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
    }
})
securitycontroller(app);
categoryController(app);
budgetController(app);
managecontroller(app);
transactioncontroller(app);
dashboradcontroller(app);
app.listen(port);
console.log('backend is started..!!');