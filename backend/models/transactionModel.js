var mongoose = require('mongoose');
var Budget = require('../models/budgetModel');
var Schema = mongoose.Schema;
var TransactionSchema = new Schema({
    transactionName : String,
    transactionAmount : Number,
    transactionRemark : String,
    transactionOn : String,
    createdAt: String,
    UName : String,
    budget : { type: Schema.Types.ObjectId, ref: 'Budget.BudgetSchema' },  
});
var Transaction = mongoose.model('Transaction',TransactionSchema);
module.exports = {
    TransactionSchema : TransactionSchema,
    TransactionModel : Transaction
  };