var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  return res.send("hey")
  res.render('index', { title: 'Express' });
});
app.use('/admin',require('./admin'))
module.exports = router;
