var express = require('express');
var router = express.Router();
var User=require('../model/user');


const{check,validationResult}=require('express-validator');



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

router.post('/register',[ 
       check('email', 'กรุณาป้อนอีเมล').isEmail(),
       check('name', 'กรุณาป้อนชื่อ').not().isEmpty(),
       check('password', 'กรุณาป้อนรหัสผ่าน').not().isEmpty()
], function(req, res, next) {
       const result=validationResult(req);
       var errors = result.errors;

       //Validation Data
       if (!result.isEmpty()) {
          //Return error to view
          res.render('register', {
            errors: errors
          })
       }else{
        //Insert Data บันทึกข้อมูล
        var name=req.body.name;
        var password=req.body.password;
        var email=req.body.email;
        var newUser=new User({
          name:name,
          password:password,
          email:email
        });
        User.createUser(newUser,function(err,user){
          if(err) throw err
         });
         res.location('/');
         res.redirect('/');
       }     
      });

module.exports = router;
 