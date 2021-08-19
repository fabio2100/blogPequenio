const {Router} = require('express');
const { validarJWTapi } = require('../controllers/validarToken');

const router = Router();

router.post('/',validarJWTapi)



module.exports = router