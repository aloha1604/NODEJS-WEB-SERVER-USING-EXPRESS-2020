var express = require('express');
var router = express.Router();
const session = require('express-session')
const Passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 10;

var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');
var User = require('../models/user.model');

router.get('/dangky',controller.dangky);

// router.get('/dangnhap',controller.dangnhap);

router.get('/home', controller.Home);

router.post('/createUser',validate.validateUser,controller.CreateUser)



router.get('/dangnhap',controller.dangnhap)
router.post('/postDangnhapValidate',Passport.authenticate('local', 
			{ successRedirect: '/loginOK',failureRedirect: '/users/dangnhap'}
		));


// passport
Passport.use(new LocalStrategy(
		(username,password,done)=>{
		   User.findOne({email: username}, function(err, username){
	          if(err) throw err;
	          if(username){
	            bcrypt.compare(password, username.password, function(err, user) {
	                if(err) throw err;
	                if(user){
	                     return done(null, username);
	                }else{
	                   return done(null, false, { message: 'Tài Khoảng Không Đúng' });
	                }
	            });
	          }else{
	             return done(null, false, { message: 'Tài Khoảng Không Đúng' });
	          }
	      });
		}
	))

	Passport.serializeUser((user,done)=>{
		done(null,user.id)
	})

	Passport.deserializeUser(function(id, done) {
	    User.findById(id).then(function (user) {
	        done(null, user);
	    }).catch(function (err) {
	        console.log(err);
	    })
	});	

// end passport
module.exports= router;