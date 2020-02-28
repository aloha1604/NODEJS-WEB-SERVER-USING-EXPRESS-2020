//require db vao day, goi model
var User = require('../models/user.model');


module.exports.dangky = function(req,res){
	res.render('users/dangky',{
	
	});
}

module.exports.dangnhap = function(req,res){
	res.render('users/dangnhap',{
	
	});
}

module.exports.Home = async function(req,res){
	var users = await User.find();
	res.send({
		users:users
	})
}

module.exports.CreateUser = async function(req,res){

	// Lấy dữ liệu ở ở post
	var user1 = await User({
	 name: req.body.name,
	 phone:req.body.phone,
	 email: req.body.email, 
	 password: req.body.password 
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