const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let quiz_schema = new Schema({
    title: {type: String},
    created: {type: String},
    expireDate: {type: new Date()},
    startDate: {type: new Date()},
    description: {type: String},
});
module.exports = mongoose.model('quiz', quiz_schema);
