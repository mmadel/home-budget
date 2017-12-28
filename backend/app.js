var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var categoryController = require('./controllers/categorycontroller');
var port = 3000;

mongoose.connect(config.getDbConnectionString());
categoryController(app);
app.listen(port);
console.log('backend is started..!!');