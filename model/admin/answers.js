const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let answers_schema = new Schema({
    answer1: {type: String},
    answer2: {type: String},
    answer3: {type: String},
    answer4: {type: String},
    trueAnswer: {type: String},
    questionId: {type: String},
});
module.exports = mongoose.model('answers', answers_schema);
