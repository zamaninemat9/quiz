const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let user_schema = new Schema({
    username: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    hash: {type: String},
    salt: {type: String},
    created:{type:Date}
});
module.exports = mongoose.model('admin_users', user_schema);
