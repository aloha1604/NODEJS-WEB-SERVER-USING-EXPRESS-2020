var express = require('express');
var router = express.Router();

var controller = require('../controller/user.controller');

router.get('/dangky',controller.dangky);

router.get('/dangnhap',controller.dangnhap);

router.get('/home', controller.Home);

module.exports= router;