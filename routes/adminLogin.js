const app = require('express').Router();
const adminLoginClass=require('./../classes/admin/login');
app.get('/login',adminLoginClass.renderPage);
module.exports = app;