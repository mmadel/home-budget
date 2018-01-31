var SecurityModule = require('../modules/securitymodule');
var UserModule = require('../modules/usermodule');
var bodyParser = require('body-parser');
module.exports = function (app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.post('/api/signup',function(req,res){        
        let user = req.body
        SecurityModule.CreateNewUser(user)
        .then(result=>{
            res.send(JSON.stringify(result));
        })
    }),
    app.post('/api/authenticate',function(req,res){
        let userName = req.body.userName
        let password = req.body.password
        SecurityModule.Authenticate(userName,password,app.get('secret'))
        .then(result=>{
            res.send(JSON.stringify(result))
        })
    })
    app.post('/api/updateUser', function(req,res){
        var user = req.body.user;
        UserModule.UpdateUser(user)
        .then(result=>{
            res.send(JSON.stringify(result));
        })
    })
}
