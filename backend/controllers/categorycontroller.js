var Category = require('../models/categoryModel');
var CategoryModule = require('../modules/categorymodule');
var bodyParser = require('body-parser');
var Response = require('../models/Response');
var dateFormat = require('dateformat');
module.exports = function (app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    //create and update category
    app.post('/api/addCategory', function (req, res) {
        console.log("@ backend-addCategory");
        var payload = req.body;
        CategoryModule.AddCategory(payload)
            .then(message => {
                response = new Response();
                response.setMessage(message);
                res.send(JSON.stringify(response));
            })
    });
    //get all categories
    app.post('/api/categories', function (req, res) {
        console.log("@ backend-listCategories");
        var userName = req.body.userName
        CategoryModule.FindCategories(userName)
            .then(categories => {
                res.send(categories);
            })
    });
    //delete category
    app.post('/api/deleteCategory', function (req, res) {
        console.log('@backend - deletecategory');
        categoryId = req.body.id;
        CategoryModule.DeleteCategory(categoryId)
            .then(message => {
                response = new Response();
                response.setMessage(message);
                res.send(JSON.stringify(response));
            })
    })
};