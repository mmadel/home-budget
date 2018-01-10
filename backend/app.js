var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var categoryController = require('./controllers/categorycontroller');
var budgetController = require('./controllers/budgetcontroller');
var managecontroller = require('./controllers/managecontroller');
var transactioncontroller = require('./controllers/transactioncontroller');
var initialCategoriesAndBudgetscontroller = require('./controllers/initialCategoriesAndBudgetscontroller');
var port = 3000;

mongoose.connect(config.getDbConnectionString());
categoryController(app);
budgetController(app);
managecontroller(app);
transactioncontroller(app);
initialCategoriesAndBudgetscontroller(app);
app.listen(port);
console.log('backend is started..!!');