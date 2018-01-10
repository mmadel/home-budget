var Category = require('../models/categoryModel');
var Budget = require('../models/budgetModel');
var Transaction = require('../models/transactionModel');
var Response = require('../models/Response');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
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
        newTransaction = Transaction.TransactionModel(req.body);
        newTransaction.createdAt = formattedCurrentDate();
        console.log(JSON.stringify(newTransaction));
        newTransaction.save(function (err) {
            response = new Response();
            response.setMessage('Transaction is created successfully');
            res.send(JSON.stringify(response));
        })

    });
    function formattedCurrentDate() {
        var now = new Date();
        //i.e 2017-10-24 
        return dateFormat(now, "yyyy-mm-dd");
    }
};