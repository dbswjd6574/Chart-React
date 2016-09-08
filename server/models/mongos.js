var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MongoSchema = new Schema({
    _id: String,
    city: String,
});

module.exports = mongoose.model('mongo', MongoSchema);