var Category = require('../models/categoryModel');
var Budget = require('../models/budgetModel');
var bodyParser = require('body-parser');
var Response = require('../models/Response');
var FinanceModule = require('../modules/financemodule');
module.exports = function (app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.post('/api/accountSuammary', function (req, res) {
        console.log("@ backend-listaccountSuammary");
        let userName = req.body.UName;
        let period = req.body.periodon
        FinanceModule.getaccountSummary(userName,period)
        .then(AccountSuammary => {
            res.send(JSON.stringify(AccountSuammary));
        })    
        .catch(err => {
            console.log('Error.. !!!');
        });

    });
};