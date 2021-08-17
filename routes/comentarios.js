const {Router} = require('express');
const { comentariosGet, comentariosPost, comentariosPut, comentariosDelete } = require('../controllers/comentarios');


const router = Router();

router.get('/',comentariosGet)

router.post('/',comentariosPost)

router.put('/',comentariosPut)

router.delete('/:id',comentariosDelete)

module.exports = router