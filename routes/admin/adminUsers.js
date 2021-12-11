const app=require('express').Router();
const cls=require('./../../classes/admin/users');
app.get('/',cls.get);
app.get('/single/:id',cls.single);
app.get('/remove/:id',cls.remove);
app.post('/update/:id',cls.update);
app.post('/insert',cls.insert);
app.post('/changePassword',cls.changePassword);
module.exports=app;