var Category = require('../models/categoryModel');
var Budget = require('../models/budgetModel');
var Transaction = require('../models/transactionModel');
var Response = require('../models/Response');
var bodyParser = require('body-parser');
var TransactionModule = require('../modules/transactionmodule');
var moment = require('moment');
module.exports = function (app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.post('/api/addtransaction', function (req, res) {
        //create Transaction
        console.log('@backend - addtransaction');
        TransactionModule.AddTransaction(req.body)
        .then(message=>{
            response = new Response();
            response.setMessage(message);
            res.send(JSON.stringify(response));
        })
    });
    app.post('/api/viewtransactions', function (req, res) {
        //View Transaction
        console.log('@backend - viewtransactions');
        TransactionModule.Viewtransactions(req.body)
        .then(transactions=>{
            res.send(JSON.stringify(transactions));
        })
    })
    app.post('/api/deletetransaction', function (req, res) {
        console.log('@backend - deletetransaction');
        TransactionModule.Deletetransaction(req.body)
        .then(message=>{
            response = new Response();
            response.setMessage(message);
            res.send(JSON.stringify(response));
        })
    })
};