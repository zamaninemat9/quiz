const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let answersSchema=new Schema({
    answer1:{type:String},
    answer2:{type:String},
    answer3:{type:String},
    answer4:{type:String},
    trueAnswer:{type:String},
});
let questions_schema = new Schema({
    quizId: {type: Schema.Types.ObjectId},
    answerCount: {type: Number},
    type: {type: Number},//1=> test ; 2=> tashrihi ; 3 => upload
    answer: answersSchema, // where type != تستی
    created: {type: new Date()},
    updated: {type: new Date()},
});

module.exports = mongoose.model('questions', questions_schema);
