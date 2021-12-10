const app = require('express').Router();
const adminLoginClass=require('./../classes/admin/login');
app.get('/login',adminLoginClass.renderPage);
app.post('/login',adminLoginClass.checkLogin);
module.exports = app;