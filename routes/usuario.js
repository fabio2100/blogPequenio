const {Router} = require('express');
const {check} = require('express-validator');
const { usuariosPost } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validarCampos');


const router = Router();

router.post('/',[
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('password','El password debe tener al menos 4 letras').isLength({min:4}),
  validarCampos
  ],usuariosPost)



module.exports = router

