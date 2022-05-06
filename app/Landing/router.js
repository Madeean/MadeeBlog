var express = require('express');
var router = express.Router();
const { UserList,incrementViews,detailArtikel, actionKomentar} = require('./controller')

router.get('/', UserList);
router.get('/view/:id', detailArtikel);
router.put('/view/:id', incrementViews);
router.post('/view/:id', actionKomentar);


module.exports = router;
