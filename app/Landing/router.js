var express = require('express');
var router = express.Router();
const { UserList,incrementViews,detailArtikel, actionKomentar, viewCategory, viewArtikelCategory, viewPopular, loadMore} = require('./controller')

router.get('/', UserList);
router.get('/view/:id', detailArtikel);
router.put('/view/:id', incrementViews);
router.post('/view/:id', actionKomentar);
router.get('/see/category',viewCategory);
router.get('/see/category/:name',viewArtikelCategory);
router.get('/see/popular',viewPopular);


module.exports = router;
