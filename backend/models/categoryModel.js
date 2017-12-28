var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var categorySchema = new Schema({
    categoryName: String,
    categoryType: String,
    createdDate : String,
});
var Category = mongoose.model('Category',categorySchema);
module.exports = Category;