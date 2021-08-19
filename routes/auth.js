const {Router} = require('express')

const {check} = require('express-validator');
const { ingresar } = require('../controllers/auth');

const {validarCampos} = require('../middlewares/validarCampos');

const router = Router();


router.post('/',ingresar);

module.exports = router