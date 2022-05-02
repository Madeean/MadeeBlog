var express = require('express');
var router = express.Router();
const { UserList} = require('./controller')
const {isLoginAdmin} = require('../middleware/auth')
router.use(isLoginAdmin)
router.get('/', UserList);


module.exports = router;