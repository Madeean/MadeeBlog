var express = require('express');
var router = express.Router();
const {viewSignin,actionSignin, viewRegister, actionRegister, logOut} = require('./controller')

/* GET home page. */   
router.get('/login',viewSignin);
router.get('/register',viewRegister);
router.post('/login',actionSignin);
router.post('/register',actionRegister);
router.get('/logout',logOut);

module.exports = router;