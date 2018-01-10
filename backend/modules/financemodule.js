var Lookup = require('../models/lookupModel');
var Budget = require('../models/budgetModel');
var Category = require('../models/categoryModel');
var dateFormat = require('dateformat');
var ConfigurationModule = require('../modules/configurationmodule');
var _ = require('lodash');
var formatCurrentDate = function (formatedDatePattern) {
    var now = new Date();
    //i.e 2017-10-24 
    return dateFormat(now, formatedDatePattern);
}

module.exports = {

    getaccountSummary: function (userName, period) {
        return new Promise((resolve, reject) => {
            let accountSuammary = {};
            let groups = [];
            ConfigurationModule.FindCategories(userName)
                .then(categories => Promise.all([categories, ConfigurationModule.FindBudgets(userName, period)]))
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
}