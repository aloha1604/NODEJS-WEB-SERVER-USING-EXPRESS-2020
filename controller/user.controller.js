//require db vao day, goi model
var User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
 // khai bao authen
const session = require('express-session')
const Passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

module.exports.dangky = function(req,res){
	res.render('users/dangky',{
	
	});
}

module.exports.dangnhap = function(req,res){
	res.render('users/dangnhap',{	
	});
}

module.exports.Home=function(req,res){
	res.render('users/dangnhap',{	
	});
}

module.exports.CreateUser = async function(req,res){
	 // Lấy dữ liệu ở ở post
	 var name  = req.body.name;
	 var phone = req.body.phone;
	 var email = req.body.email;
	 var password = req.body.password;

	// has password 
	var hashPassword  = bcrypt.hashSync(password, saltRounds);
	console.log(hashPassword);
	var user1 = await User({
	 name: name,
	 phone: phone,
	 email: email, 
	 password: hashPassword
	});

	// save dữ liệu 
    user1.save(function (err, user) {
      if (err) return console.error(err);
      console.log(user.name + " saved to user collection.");
       // chuyển hướng đến trang đăng ký
	    res.render('users/dangnhap',{
	    	memo:'ban da dang ky thanh cong'
	    });
    });

}

