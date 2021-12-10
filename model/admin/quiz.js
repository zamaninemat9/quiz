const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let quiz_schema = new Schema({
    title: {type: String},
    created: {type: new Date()},
    updated: {type: new Date()},
    expireDate: {type: new Date()},
    startDate: {type: new Date()},
    description: {type: String},
    catId: {type: Schema.Types.ObjectId},
});
module.exports = mongoose.model('quiz', quiz_schema);
