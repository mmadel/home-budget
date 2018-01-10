var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LookupSchema = new Schema({
    LookupName: String
});
var Lookup = mongoose.model('Lookup',LookupSchema);
module.exports={
    lookupSchema : LookupSchema,
    LookupModel : Lookup
};