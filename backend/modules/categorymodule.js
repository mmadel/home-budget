var Category = require('../models/categoryModel');
var LookupsModule = require('../modules/lookupsmodule');
var dateFormat = require('dateformat');
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
var addCategories = function (userName) {
    return new Promise((resolve, reject) => {
        LookupsModule.PrepareLookupCategories(userName)
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
var addCategory = function (payload) {
    return new Promise((resolve, reject) => {
        //update category
        if (payload._id) {
            Category.categoryModel.findByIdAndUpdate(req.body.id, req.body, function (err, category) {
                if (err) throw err;
                res.send('success');
            });
        } else {
            //create category
            newCategory = Category.categoryModel(payload);
            newCategory.createdDate = formattedCurrentDate();
            newCategory.save(function (err) {
                resolve('Category is created successfully');
            })
        }
    })
}
var deleteCategory = function (categoryId) {
    return new Promise((resolve, reject) => {
        Category.categoryModel.findByIdAndRemove(categoryId, function (err) {
            if (err) throw err;
            resolve('Category is deleted successfully');
        })
    })
}
function formattedCurrentDate() {
    var now = new Date();
    //i.e 2017-10-24 
    return dateFormat(now, "yyyy-mm-dd");
}
module.exports = {
    FindCategories: findCategories,
    AddCategory: addCategory,
    DeleteCategory:deleteCategory
}