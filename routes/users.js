var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/Login', function(req, res, next) {
  res.render('Login');
});

router.post('/register', function(req, res, next) {
  console.log(req.body.name);
  console.log(req.body.password);
  console.log(req.body.email);
});

module.exports = router;
 