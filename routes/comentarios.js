const {Router} = require('express');
const { comentariosGet, comentariosPost, comentariosPut, comentariosDelete } = require('../controllers/comentarios');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = Router();

router.get('/',[validarJWT,validarCampos],comentariosGet)

router.post('/',[validarJWT,validarCampos],comentariosPost)

router.put('/',[validarJWT,validarCampos],comentariosPut)

router.delete('/:id',[validarJWT,validarCampos],comentariosDelete)

module.exports = router