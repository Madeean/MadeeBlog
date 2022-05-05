var express = require('express');
var router = express.Router();
const { UserList,detailArtikel, incrementViews} = require('./controller')

router.get('/', UserList);
router.get('/:id', detailArtikel);
router.put('/:id', incrementViews);


module.exports = router;
