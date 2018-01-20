var Lookup = require('../models/lookupModel');
var Budget = require('../models/budgetModel');
var Category = require('../models/categoryModel');
var Transaction = require('../models/transactionModel');
var dateFormat = require('dateformat');
var LookupsModule = require('../modules/lookupsmodule');
var Budgetmodule = require('../modules/budgetmodule');
var CategoryModule = require('../modules/categorymodule');
var _ = require('lodash');
var formatCurrentDate = function (formatedDatePattern) {
    var now = new Date();
    //i.e 2017-10-24 
    return dateFormat(now, formatedDatePattern);
}
var findTransactionByRange = function (userName, start, end) {
    return new Promise((resolve, reject) => {
        Transaction.TransactionModel.find({ UName: userName, transactionOn: { $gte: start, $lte: end } }, function (err, transactions) {
            return resolve(transactions)
        })
    })
}
var findBudgetByRange = function (userName, start, end) {
    return new Promise((resolve, reject) => {
        Budget.budgetModel.find({ UName: userName, periodon: { $gte: start, $lte: end } }, function (err, budgets) {
            return resolve(budgets)
        })
    })
}
var getaccountSummary =function (userName, period) {
    return new Promise((resolve, reject) => {
        let accountSuammary = {};
        let groups = [];
        CategoryModule.FindCategories(userName)
            .then(categories => Promise.all([categories, Budgetmodule.FindBudgets(userName, period)]))
            .then(function (result) {
                var categoiesData = result[0];
                var budgetsData = result[1];
                let pending = categoiesData.length;
                categoiesData.forEach((category) => {
                    pending--
                    let group = {
                        "id": category._id,
                        "name": category.categoryName,
                        "type": category.categoryType,
                        "projected": 0.0,
                        "actual": 0.0,
                        "budgets": _.filter(budgetsData, ['category.categoryName', category.categoryName])
                    };
                    groups.push(group)
                    if (pending == 0) {
                        accountSuammary = {
                            "groups": groups
                        };
                        return resolve(accountSuammary);
                    }
                })

            })
    })
} 
module.exports = {
    FindTransactionByRange: findTransactionByRange,
    FindBudgetByRange: findBudgetByRange,
    getaccountSummary: getaccountSummary
}