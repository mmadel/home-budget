var mongoose = require('mongoose');
var Budget = require('../models/budgetModel');
var Schema = mongoose.Schema;
var TransactionSchema = new Schema({
    transactionName : String,
    transactionAmount : String,
    transactionRemark : String,
    transactionOn : String,
    createdAt: String,
    budget : Budget.BudgetSchema,
});
var Transaction = mongoose.model('Transaction',TransactionSchema);
module.exports = {
    TransactionSchema : TransactionSchema,
    TransactionModel : Transaction
  };