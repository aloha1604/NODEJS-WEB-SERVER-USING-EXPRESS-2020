var express = require('express');
var router = express.Router();


var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');

router.get('/dangky',controller.dangky);

router.get('/dangnhap',controller.dangnhap);

router.get('/home', controller.Home);

router.post('/createUser',validate.validateUser,controller.CreateUser)

module.exports= router;