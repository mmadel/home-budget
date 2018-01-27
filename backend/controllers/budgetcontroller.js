var bodyParser = require('body-parser');
var Response = require('../models/Response');
var dateFormat = require('dateformat');
var Category = require('../models/categoryModel');
var Budget = require('../models/budgetModel');
var dateFormat = require('dateformat');
var Budgetmodule = require('../modules/budgetmodule');
module.exports = function (app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    //create and update budget
    app.post('/api/addBudget', function (req, res) {
        console.log("@ backend-addBudget");
        var payload = req.body;
        console.log(JSON.stringify(req.body) + ' #################');
        Budgetmodule.AddBudget(payload)
            .then(message => {
                response = new Response();
                response.setMessage(message);
                res.send(JSON.stringify(response));
            })
    });
    //get all budgets
    app.post('/api/budgets', function (req, res) {
        console.log("@ backend-budgets");
        var userName = req.body.userName
        var periodon = req.body.periodon
        Budgetmodule.FindBudgets(userName, periodon)
            .then(budgets => {
                res.send(budgets);
            })
    });
    //delete budget
    app.post('/api/deleteBudget', function (req, res) {
        var budgteId = req.body.id;
        Budgetmodule.DeletBudgetById(budgteId)
            .then(message => {
                response = new Response();
                response.setMessage(message);
                res.send(JSON.stringify(response));
            })
    })
};