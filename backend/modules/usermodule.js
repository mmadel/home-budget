var User = require('../models/userModel');
var jwt = require('jsonwebtoken');
var addUser = function (user) {
    return new Promise((resolve, reject) => {
        newUser = User.userModel(user);
        console.log(newUser);
        newUser.save(function (err) {
            resolve('done.');
        })
    })
}
var findUser = function (userName) {
    return new Promise((resolve, reject) => {
        User.userModel.findOne({ "name": userName }, function (err, user) {
            resolve(user);
        })
    })
}
module.exports = {
    AddUser: addUser,
    FindUser: findUser
}
