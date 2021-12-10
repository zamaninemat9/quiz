const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let questions_schema = new Schema({
    quizId: {type: String},
    answerCount: {type: Number},
    type: {type: Number},
    answer: {type: String}, // where type != تستی
});
module.exports = mongoose.model('questions', questions_schema);
