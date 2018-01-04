var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategorySchema = new Schema({
    categoryName: String,
    categoryType: String,
    createdDate : String,
});
var Category = mongoose.model('Category',CategorySchema);

module.exports={
    categorySchema : CategorySchema,
    categoryModel : Category
};