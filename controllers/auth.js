const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');


const ingresar = async (req, res=response)=>{
  const {nombre,password} = req.body;

  try {
    const usuario = await Usuario.findOne({nombre});
    if (!usuario){
      return res.status(400).json({
        msg:"El usuario no está registrado"
      })
    }
    const validarPassword = bcryptjs.compareSync(password,usuario.password);
    if(!validarPassword){
      return res.status(400).json({
        msg: " El password no coincide"
      })
    }
    const token =await generarJWT(usuario._id);
    console.log(token)
    res.json({
      msg:'Login OK',
      token,nombre
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg : 'Algo salió mal tratar de recuperar correo y password'
    })
  }
}


module.exports = {ingresar}