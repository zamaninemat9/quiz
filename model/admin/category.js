const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let category_schema = new Schema({
    title: {type: String},
    created: {type: new Date()},
    updated: {type: new Date()},
});
module.exports = mongoose.model('category', category_schema);
