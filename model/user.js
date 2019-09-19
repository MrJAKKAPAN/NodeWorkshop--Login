//model 
/* ใช้ connect กับตัว mongodb */

var mongoose=require('mongoose');
var bcrypt = require('bcryptjs');
var mongoDB='mongodb://localhost:27017/LoginDB';

mongoose.connect(mongoDB,{
    useNewUrlParser:true
})

//Connect 
/*ถ้าการ connect มีปัญหา จะแจ้งเตือนว่า MongoDB connect Error*/
var db=mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connect Error'));

//Create Schema 
var userSchema=mongoose.Schema({
    name:{ type:String },
    email:{type:String },
    password:{type:String }
});

var User=module.exports=mongoose.model('User',userSchema);

module.exports.createUser=function(newUser,callback){
    //การเข้ารหัส
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password=hash;
            newUser.save(callback);
        });
    });
    module.exports.getUserById=function(id,callback){
        User.findById(Id,callback);
    }
    module.exports.getUserByName=function(name,callback){
        var query={
            name:name
        };
        User.findOne(query,callback);
    }
}