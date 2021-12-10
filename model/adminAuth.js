const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let user_schema = new Schema({
    username: {type: String},
    ip: {type: String},
    agent: {type: String},
    uuid: {type: String},
    ttl: {type: Date},
});
module.exports = mongoose.model('admin_Auth', user_schema);
