var Category = require('../models/categoryModel');
var bodyParser = require('body-parser');
module.exports = function(app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended : true}))

    //create and update category
    app.post('/api/addCategory',function(req,res){
        //update category
        if(req.body.id){
            Category.findByIdAndUpdate(req.body.id,req.body,function(err,category){
                if(err) throw err;
                res.send('success');
            });
        }else{
            //create category
            newCategory = Category(req.body);
            newCategory.save(function(err){
                res.send('Success');
            })
        }
    });
    //get all categories
    app.get('/api/categories',function(req,res){
        Category.find(function(err,categories){
            if(err) throw err;
            res.send(categories);
        })
    });
    //get caregory by id
    app.post('/api/category',function(req,res){
        Category.findById(req.body.id,function(err,category){
            if(err) throw err
            res.send(category);
        })
    });
    //delete category
    app.post('/api/deleteCategory',function(req,res){
        Category.findByIdAndRemove(req.body.id,function(err){
            if(err) throw err;
            res.send('Success');
        })
    })
};