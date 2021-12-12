const app = require('express').Router();
const loginCls = require('./../../classes/users/login');
app.get('/login', loginCls.render);
app.post('/login', loginCls.set);

module.exports = app;