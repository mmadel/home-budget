var mongoose = require('mongoose');
var CategorySchema  = require('./categoryModel');
var Schema = mongoose.Schema;
var BudgetSchema = new Schema({
    budgetName: String,
    projected: Number,
    actual: Number,
    periodon: String,
    createDate: String,
    category: CategorySchema.categorySchema
  });
var Budget = mongoose.model('Budget',BudgetSchema);
module.exports = {
  BudgetSchema : BudgetSchema,
  budgetModel : Budget
};