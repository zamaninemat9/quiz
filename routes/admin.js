const app = require('express').Router();
app.use('/login', require('./adminLogin'));
app.use('/users', require('./admin/adminUsers'));
module.exports = app;