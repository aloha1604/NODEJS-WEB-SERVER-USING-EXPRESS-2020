var User = require('../models/user.model');
// khai bao authen
const session = require('express-session')
const Passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

module.exports.postDangNhapUser = function(req,res,next){
	
	Passport.use(new LocalStrategy(
		(email,password,done)=>{
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
		done(null,user.email)
	})

	Passport.deserializeUser((email,done)=>{
			User.findOne({ email: email }).exec(function(err,user){
				      if (err) {
				        return callback(err)
				      } else if (!user) {
				        var err = new Error('User not found.');
				        err.status = 401;
				        return callback(err);
				      }
				      
				      if(user){
							return done(null,user)
						}else{
							return done(null,false)
						}

			});
		// fs.readFile('./userDB.json',(err,data)=>{
		// 	const db = JSON.parse(data)
		// 	const userRecord = db.find(user=> user.usr == email)
		// 	if(userRecord){
		// 			return done(null,userRecord)
		// 		}else{
		// 			return done(null,false)
		// 		}
		// })
	})


	if(req.isAuthenticated()){
		req.render('/loginOK');
	}else{
		res.render('users/dangnhap');
	}
}