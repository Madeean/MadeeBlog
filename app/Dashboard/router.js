var express = require('express');
var router = express.Router();
const {dashboard} = require('./controller')

/* GET home page. */
const {isLoginAdmin} = require('../middleware/auth')
router.use(isLoginAdmin)
router.get('/', dashboard);


module.exports = router;