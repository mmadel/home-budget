var bodyParser = require('body-parser');
var Response = require('../models/Response');
var dateFormat = require('dateformat');
var Category = require('../models/categoryModel');
var Budget = require('../models/budgetModel');
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
    //create and update budget
    app.post('/api/addBudget', function (req, res) {
        console.log("@ backend-addBudget");
        //update budget
        if (req.body.id) {
            Budget.budgetModel.findByIdAndUpdate(req.body.id, req.body, function (err, budget) {
                if (err) throw err;
                res.send('success');
            });
        } else {
            //create budget
            newBudget = Budget.budgetModel(req.body);
            console.log(JSON.stringify(newBudget));
            newBudget.createDate = formattedCurrentDate("yyyy-mm-dd");
            newBudget.periodon = formattedCurrentDate( "yyyy-mm");
            newBudget.actual=0.0;
            newBudget.save(function (err) {
                response = new Response();
                response.setMessage('Budget is created successfully');
                res.send(JSON.stringify(response));
            })
        }
    });
    //get all budgets
    app.get('/api/budgets', function (req, res) {
        console.log("@ backend-budgets");
        Budget.budgetModel.find(function (err, budgets) {
            if (err) throw err;
            res.send(budgets);
        })
    });
    app.post('/api/budget', function (req, res) {
        Budget.budgetModel.findById(req.body.id, function (err, budget) {
            if (err) throw err
            res.send(budget);
        })
    });
    //delete budget
    app.post('/api/deleteBudget', function (req, res) {
        Budget.budgetModel.findByIdAndRemove(req.body.id, function (err) {
            if (err) throw err;
            response = new Response();
            response.setMessage('deleteBudget is deleted successfully');
            res.send(JSON.stringify(response));
        })
    })
    function formattedCurrentDate (format) {
        var now = new Date();
        //i.e 2017-10-24 
        return dateFormat(now,format);
    }
};