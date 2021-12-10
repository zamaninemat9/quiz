const app=require('express').Router();
app.use('/login',require('./adminLogin'))
module.exports=app;