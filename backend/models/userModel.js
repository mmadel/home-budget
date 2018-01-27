var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    password: String,
    email : String,
});
var User = mongoose.model('User',UserSchema);

module.exports={
    userSchema : UserSchema,
    userModel : User
};