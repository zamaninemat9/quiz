const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let questions_schema = new Schema({
    quizId: {type: Schema.Types.ObjectId},
    answerCount: {type: Number},
    type: {type: Number},
    answer: {type: String}, // where type != تستی
    created: {type: Date},
    updated: {type: Date},
});
module.exports = mongoose.model('questions', questions_schema);
