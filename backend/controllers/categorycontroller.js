var Category = require('../models/categoryModel');
var bodyParser = require('body-parser');
var Response = require('../models/Response');
var dateFormat = require('dateformat');
module.exports = function (app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    //create and update category
    app.post('/api/addCategory', function (req, res) {
        console.log("@ backend-addCategory");
        //update category
        if (req.body.id) {
            Category.categoryModel.findByIdAndUpdate(req.body.id, req.body, function (err, category) {
                if (err) throw err;
                res.send('success');
            });
        } else {
            //create category
            newCategory = Category.categoryModel(req.body);
            newCategory.createdDate = formattedCurrentDate();
            newCategory.save(function (err) {
                response = new Response();
                response.setMessage('Category is created successfully');
                res.send(JSON.stringify(response));
            })
        }
    });
    //get all categories
    app.get('/api/categories', function (req, res) {
        console.log("@ backend-listCategories");
        Category.categoryModel.find(function (err, categories) {
            if (err) throw err;
            res.send(categories);
        })
    });
    //get caregory by id
    app.post('/api/category', function (req, res) {
        Category.categoryModel.findById(req.body.id, function (err, category) {
            if (err) throw err
            res.send(category);
        })
    });
    //delete category
    app.post('/api/deleteCategory', function (req, res) {
        console.log('@backend - deletecategory' + req.body.id);
        Category.categoryModel.findByIdAndRemove(req.body.id, function (err) {
            if (err) throw err;
            response = new Response();
            response.setMessage('Category is deleted successfully');
            res.send(JSON.stringify(response));
        })
    })
    function formattedCurrentDate () {
        var now = new Date();
        //i.e 2017-10-24 
        return dateFormat(now, "yyyy-mm-dd");
    }
};