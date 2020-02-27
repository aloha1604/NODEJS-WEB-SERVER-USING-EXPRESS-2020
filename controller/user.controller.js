//require db vao day, goi model
var User = require('../models/user.model');


module.exports.dangky = function(req,res){
	res.render('users/dangky',{
		name:'day la trang dang ky'
	});
}

module.exports.dangnhap = function(req,res){
	res.render('users/dangnhap',{
		name:'day la trang dang nhap'
	});
}

module.exports.Home = async function(req,res){
	var users = await User.find();
	res.send({
		users:users
	})
}