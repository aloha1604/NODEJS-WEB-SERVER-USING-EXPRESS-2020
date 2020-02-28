module.exports.validateUser= function(req,res,next){
	var errors = [];

	if(!req.body.name){
		errors.push('name is required');
	}

	if(!req.body.phone){
		errors.push('phone is required');
	}

	if(!req.body.email){
		errors.push('email is required');
	}

	if(!req.body.password){
		errors.push('password is required');
	}

	if(errors.length){
		res.render('users/dangky',{
			errors:errors
		})
		return;
	}

	next();
}