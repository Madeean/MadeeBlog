var express = require('express');
var router = express.Router();
const { UserList} = require('./controller')

router.get('/', UserList);


module.exports = router;
