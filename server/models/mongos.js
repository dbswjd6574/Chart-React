/**
 * Created by ±è´ëÇö on 2016-09-08.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MongoSchema = new Schema({
    _id: String,
    city: String,
});

module.exports = mongoose.model('chart', MongoSchema);