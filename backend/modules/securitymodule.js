var UserModule = require('../modules/usermodule');
var jwt    = require('jsonwebtoken');
var createNewUser = function (user) {
    return new Promise((resolve, reject) => {
        UserModule.AddUser(user)
            .then(result => {
                resolve(result);
            })
    })
}
var authenticate = function (userName, password,secret) {
    return new Promise((resolve, reject) => {
        UserModule.FindUser(userName)
            .then(user => {
                if (!user) {
                    response = { "success": false, "message": 'Authentication failed. User not found.' }
                    resolve(response);
                } else if (user) {
                    if (user.password != password) {
                        response = { "success": false, "message": 'Authentication failed. Wrong password.' }
                        resolve(response);
                    } else {
                        var payload = {
                            user: user.name 
                        }
                        var token = jwt.sign(payload,secret , {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        response = {
                            success: true,
                            token: token,
                            expiration: {"number":"1", "type":"days"},
                            user : user
                        }
                        resolve(response);
                    }
                }
            })
    })
}
module.exports = {
    CreateNewUser: createNewUser,
    Authenticate: authenticate
}