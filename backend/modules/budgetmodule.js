var Budget = require('../models/budgetModel');
var CategoryModule = require('../modules/categorymodule');
var LookupsModule = require('../modules/lookupsmodule');
var dateFormat = require('dateformat');
var moment = require('moment');
var findBudgets = function (userName, periodon) {
    return new Promise((resolve, reject) => {
        Budget.budgetModel.find({ "UName": userName, "periodon": periodon }, function (err, budgets) {
            if (budgets.length > 0) {
                console.log(userName + ' has budgets in ' + periodon);
                return resolve(budgets);
            }
            if (budgets.length == 0) {
                console.log(userName + ' has not budgets in ' + periodon);
                CategoryModule.FindCategories(userName)
                    .then(categories => {
                        return addDefualtBudgets(userName, periodon, categories);
                    })
                    .then(budgets => {
                        return resolve(budgets);
                    })
            }
        })
    })
}
var addDefualtBudgets = function (userName, periodon, categories) {
    return new Promise((resolve, reject) => {
        LookupsModule.PrepareLookupBudgets(userName, periodon)
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
var addBudget = function(payload){
   return new Promise((resolve, reject)=>{
    
    if (payload._id) {
        Budget.budgetModel.findByIdAndUpdate(payload._id, payload, function (err, budget) {
            resolve('Budget is updated successfully');
        });
    } else {
        //create budget
        newBudget = Budget.budgetModel(payload);
        console.log(JSON.stringify(newBudget));
        newBudget.createDate = formattedCurrentDate("yyyy-mm-dd");
        newBudget.periodon = moment().format('YYYY-MM');
        newBudget.actual=0.0;
        newBudget.save(function (err) {
            console.log('Budget is created successfully')
            resolve('Budget is created successfully');
        })
    }
   })
}
var deletBudgetById = function(budgetId){
    return new Promise((resolve , reject)=>{
        Budget.budgetModel.findByIdAndRemove(budgetId, function (err) {
            if (err) throw err;
            resolve('Budget is deleted successfully');
        })
    })
}
function formattedCurrentDate() {
    var now = new Date();
    //i.e 2017-10-24 
    return dateFormat(now, "yyyy-mm-dd");
}
module.exports = {
    FindBudgets:findBudgets,
    AddBudget:addBudget,
    DeletBudgetById : deletBudgetById
}