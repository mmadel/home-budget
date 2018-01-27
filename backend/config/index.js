var configValues = require('./config');

module.exports={
    getDbConnectionString : function(){
        return 'mongodb://'+ configValues.username + ':' + configValues.password +'@127.0.0.1:27017/homebudget';
    },
    secretValue  : function(){
        return configValues.secret;
    }
}