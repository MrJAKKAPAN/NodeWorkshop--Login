//Routes
var express = require('express');
var router = express.Router();
var User=require('../model/user');

var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

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
router.get('/Logout', function(req, res) {
  req.logout();
  res.redirect('/users/Login');
});





router.post('/Login',passport.authenticate('local',{
      failureRedirect:'/users/login',
      failureFlash: true
}),
function(req, res) {
      req.flash("success", "ลงชื่อเข้าใช้เรียบร้อย"); //กำหนดเอง
      res.redirect('/');
});
passport.serializeUser(function(user,done){
      done(null,user.id);
});
passport.deserializeUser(function(id,done){
      User.getUserById(id,function(err,user){
        done(err,user);
      });
});

passport.use(new LocalStrategy(function(username,password,done){
      User.getUserByName(username,function(err,user){
        if(err) throw error
        if(!user){
            //ไม่พบผู้ใช้
            return done(null,false)
        }else{
            return done(null, user)
          }          
          User.comparePassword(password, user.password, function(err,isMatch) {
          if(err) throw err
          if(isMatch){
            return done(null,user)
          }else{
            return done(null,false)
          }  
      });
    }); 
}));

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
 