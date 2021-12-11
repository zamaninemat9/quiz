const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let user_schema = new Schema({
    nationalCode: {type: String},
    mobile: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    countOfQuiz: {type: Number},
    created: {type: Date},
    lastQuizTime: {type: Date},
});
module.exports = mongoose.model('users', user_schema);
