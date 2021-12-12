const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let user_schema = new Schema({
    nationalCode: {type: String},
    ip: {type: String},
    agent: {type: String},
    uuid: {type: String},
    ttl: {type: Date},
    quiz: {type: Schema.Types.ObjectId}
});
module.exports = mongoose.model('user_Auth', user_schema);
