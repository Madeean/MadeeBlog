var express = require('express');
var router = express.Router();
const {artikelList,viewCreate,actionCreate,viewDetail,viewEdit,actionEdit,actionDelete} = require('./controller')
const multer = require('multer')
const os = require('os')
const {isLoginAdmin,} = require('../middleware/auth')
router.use(isLoginAdmin)

router.get('/', artikelList);
router.get('/create', viewCreate);
router.post('/create', multer({dest:os.tmpdir()}).single('thumbnail') ,actionCreate);
router.get('/:id',viewDetail)
router.get('/edit/:id', viewEdit);
router.put('/edit/:id',multer({dest:os.tmpdir()}).single('thumbnail'), actionEdit);
router.delete('/delete/:id',actionDelete)



module.exports = router;