var express = require('express');
var router = express.Router();
const adminQuiz = require('./../classes/admin/quiz/quiz');


/* GET home page. */
router.get('/', function(req, res) {
  return res.send("hey")
  // res.render('index', { title: 'Express' });
});

router.use('/admin',require('./admin'));
router.get('/admin/quiz',adminQuiz.index);
router.post('/admin/quiz/insert',adminQuiz.insert);
router.post('/admin/quiz/update',adminQuiz.update);
router.get('/admin/quiz/edit/:id',adminQuiz.edit);
router.get('/admin/quiz/delete/:id',adminQuiz.delete);
router.get('/admin/quiz/get',adminQuiz.get);
router.get('/admin/quiz/create',adminQuiz.create);

module.exports = router;
