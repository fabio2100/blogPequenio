const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req,res,next) => {
  const token = req.cookies.token;
  if (!token){
    return res.status(401).json({
      msg:"No hay token en la petición"
    })
  }
  try {
    const {uid} = jwt.verify(token,process.env.PRIVATEKEY); 
    const usuario = await Usuario.findById(uid);
    if (!usuario ){
      return res.status(401).json({
        msg:'Token no válido - usuario inexistente en bbdd'})
    
    }
    if (!usuario.estado){
      return res.status(401).json({
        msg:'Token no válido - usuario en estado false'})
    }
    req.usuario = usuario.toJSON();
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg:'Token no válido'
    })
  }
}

module.exports = {validarJWT}