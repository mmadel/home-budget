var Category = require('../models/categoryModel');
var Budget = require('../models/budgetModel');
var Transaction = require('../models/transactionModel');
var Response = require('../models/Response');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
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
        newTransaction = Transaction.TransactionModel(req.body);
        newTransaction.createdAt = formattedCurrentDate();
        newTransaction.budget.actual = newTransaction.budget.actual +  newTransaction.transactionAmount;
        newTransaction.save(function (err, transaction) {
            Budget.budgetModel.findByIdAndUpdate({ "_id": transaction.budget._id }, newTransaction.budget, function (err, budget) {
                response = new Response();
                response.setMessage('Transaction is created successfully');
                res.send(JSON.stringify(response));
            });
        })

    });
    app.post('/api/viewtransactions', function (req, res) {
        //View Transaction
        console.log('@backend - viewtransactions');
        selectedBudget = Budget.budgetModel(req.body);
        Transaction.TransactionModel.find({ "budget.budgetName": selectedBudget.budgetName, "budget.periodon": selectedBudget.periodon, "budget.UName": selectedBudget.UName }, function (err, transactions) {
            res.send(JSON.stringify(transactions));
        })
    })
    app.post('/api/deletetransaction', function (req, res) {
        console.log('@backend - deletetransaction');
        transaction = Transaction.TransactionModel(req.body);
        
        Transaction.TransactionModel.findByIdAndRemove(req.body._id, function (err) {
            console.log(JSON.stringify(transaction));
            transaction.budget.actual -= transaction.transactionAmount;
            
            Budget.budgetModel.findByIdAndUpdate(transaction.budget._id, transaction.budget, function (err, budget) {
                response = new Response();
                response.setMessage('Transaction is deleted successfully');
                res.send(JSON.stringify(response));
            });
        })
    })
    function formattedCurrentDate() {
        var now = new Date();
        //i.e 2017-10-24 
        return dateFormat(now, "yyyy-mm-dd");
    }
};