const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosPost = async function (req, res){
  try {
    const {nombre,password} = req.body;

    const salt = bcryptjs.genSaltSync();
    const passwordencriptado = bcryptjs.hashSync(password,salt);
    const usuario  = new Usuario({nombre,password:passwordencriptado});
    await usuario.save();
    return res.status(201).json(usuario)  
  } catch (error) {
    res.status(500).json(error)
  }
  
  if (resultado){

  }
}


module.exports = {usuariosPost}