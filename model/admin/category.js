const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let category_schema = new Schema({
    title: {type: String},
    created: {type: Date},
    updated: {type: Date},
});
module.exports = mongoose.model('category', category_schema);
