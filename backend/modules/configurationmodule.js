var Lookup = require('../models/lookupModel');
var Budget = require('../models/budgetModel');
var Category = require('../models/categoryModel');
var dateFormat = require('dateformat');
var _ = require('lodash');

var formatCurrentDate = function (formatedDatePattern) {
    var now = new Date();
    //i.e 2017-10-24 
    return dateFormat(now, formatedDatePattern);
}

var findCategories = function (userName) {
    return new Promise((resolve, reject) => {
        Category.categoryModel.find({ "UName": userName }, function (err, categories) {
            if (categories.length > 0) {
                console.log(userName + ' has categories');
                return resolve(categories);
            }
            if (categories.length == 0) {
                console.log(userName + ' has not  categories');
                addCategories(userName)
                    .then((categories) => {
                        return resolve(categories);
                    })
            }
        })
    })
}
var findBudgets = function (userName, periodon) {
    return new Promise((resolve, reject) => {
        Budget.budgetModel.find({ "UName": userName, "periodon": periodon }, function (err, budgets) {
            if (budgets.length > 0) {
                console.log(userName + ' has budgets in ' + periodon);
                return resolve(budgets);
            }
            if (budgets.length == 0) {
                console.log(userName + ' has not budgets in ' + periodon);
                findCategories(userName)
                    .then(categories => {
                        return addBudgets(userName, periodon, categories);
                    })
                    .then(budgets => {
                        return resolve(budgets);
                    })
            }
        })
    })
}
var addCategories = function (userName) {
    return new Promise((resolve, reject) => {
        prepareLookupCategories(userName)
            .then(categories => {
                let pending = categories.length;
                let categoriesBuffer = [];
                categories.forEach((category) => {
                    category.save();
                    pending--
                    categoriesBuffer.push(category);
                    if (pending == 0) {
                        resolve(categoriesBuffer);
                    }
                })
            })
    })
}
var prepareLookupCategories = function (userName) {
    return new Promise((resolve, reject) => {
        Lookup.LookupModel.findOne(function (err, Lookups) {
            var data = JSON.parse(JSON.stringify(Lookups));
            let categories = data["categories"];
            let categoriesBuffer = [];
            let pending = categories.length;
            categories.forEach((category) => {
                var categoryData = JSON.parse(JSON.stringify(category));
                newCategory = new Category.categoryModel();
                newCategory = new Category.categoryModel();
                newCategory.categoryName = categoryData["name"]
                newCategory.categoryType = categoryData["type"]
                newCategory.UName = userName;
                newCategory.createdDate = formatCurrentDate('yyyy-mm-dd');
                categoriesBuffer.push(newCategory)
                pending--
                if (pending == 0) {
                    return resolve(categoriesBuffer);
                }
            })
        })
    })
}
var addBudgets = function (userName, periodon, categories) {
    return new Promise((resolve, reject) => {
        prepareLookupBudgets(userName, periodon)
            .then(budgets => {
                let pending = budgets.length;
                let budgetsBuffer = [];
                categories.forEach((category) => {
                    budgets.forEach((budget) => {
                        if (budget.category.categoryName == category.categoryName) {
                            budget.category = category;
                            budget.save();
                            pending--
                            budgetsBuffer.push(budget);
                            if (pending == 0) {
                                resolve(budgetsBuffer);
                            }
                        }

                    })
                })
            })
    })
}
var prepareLookupBudgets = function (userName, periodon) {
    return new Promise((resolve, reject) => {
        Lookup.LookupModel.findOne(function (err, Lookups) {
            var data = JSON.parse(JSON.stringify(Lookups));
            let budgets = data["budgets"];
            let budgetsBuffer = [];
            let pending = budgets.length;
            budgets.forEach((budget) => {
                var lookupBudgetData = JSON.parse(JSON.stringify(budget));
                newBudget = new Budget.budgetModel();
                newBudget.budgetName = lookupBudgetData.name;
                category = new Category.categoryModel()
                category.categoryName = lookupBudgetData.category;
                newBudget.category=category;
                newBudget.UName = userName;
                newBudget.periodon = periodon;
                newBudget.actual = 0.0;
                newBudget.projected = 0.0;
                newBudget.createdDate = formatCurrentDate('yyyy-mm-dd');
                budgetsBuffer.push(newBudget)
                pending--
                if (pending == 0) {
                    return resolve(budgetsBuffer);
                }
            })
        })
    })
}
module.exports = {
    FindCategories: findCategories,
    FindBudgets: findBudgets
}