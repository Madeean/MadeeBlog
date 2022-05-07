var express = require('express');
var router = express.Router();
const { actionLike,} = require('./controller')
const {isLoginAdmin} = require('../middleware/auth')
router.use(isLoginAdmin)
router.put('/post/:id', actionLike);


module.exports = router;