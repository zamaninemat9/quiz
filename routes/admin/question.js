const app = require('express').Router();
const questionCls = require('./../../classes/admin/question');
app.get('/', questionCls.render);
app.get('/single/:id', questionCls.getSingle);
app.post('/insert/:id', questionCls.insert);
app.get('/remove/:id', questionCls.remove);
app.post('/update/:id', questionCls.update);
module.exports = app;
