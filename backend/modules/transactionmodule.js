var dateFormat = require('dateformat');
var addTransaction = function (transaction) {
    return new Promise((resovle, reject) => {
        newTransaction = Transaction.TransactionModel(transaction);
        newTransaction.createdAt = formattedCurrentDate();

        newTransaction.save(function (err, transaction) {
            Budget.budgetModel.findById({ "_id": newTransaction.budget }, function (err, budget) {
                budget.actual += newTransaction.transactionAmount;
                Budget.budgetModel.findByIdAndUpdate({ "_id": newTransaction.budget }, budget, function (err, budget) {
                    resovle('Transaction is created successfully');
                });
            })
        })
    })
}
var viewtransactions = function (transactionBudget) {
    return new Promise((resovle, reject) => {
        selectedBudget = Budget.budgetModel(transactionBudget);

        Transaction.TransactionModel.find({ "budget": selectedBudget._id, "UName": selectedBudget.UName }, function (err, transactions) {
            resovle(transactions);
        })
    })
}
var deletetransaction = function (transaction) {
    return new Promise((resovle, reject) => {
        transaction = Transaction.TransactionModel();

        Transaction.TransactionModel.findByIdAndRemove(req.body._id, function (err) {
            Budget.budgetModel.findById({ "_id": transaction.budget }, function (err, budget) {
                budget.actual -= transaction.transactionAmount;
                Budget.budgetModel.findByIdAndUpdate(transaction.budget, budget, function (err, budget) {
                    resovle('Transaction is deleted successfully')
                });
            });
        })
    })
}
function formattedCurrentDate() {
    var now = new Date();
    //i.e 2017-10-24 
    return dateFormat(now, "yyyy-mm-dd");
}
module.exports = {
    AddTransaction: addTransaction,
    Viewtransactions: viewtransactions,
    Deletetransaction: deletetransaction
}