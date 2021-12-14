const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let quiz_schema = new Schema({
    title: {type: String},
    created: {type: Date},
    updated: {type: Date},
    expireDate: {type: Date},
    startDate: {type: Date},
    description: {type: String},
    catId: {type: Schema.Types.ObjectId},
});
module.exports = mongoose.model('quiz', quiz_schema);
