const jwt = require('jsonwebtoken');

const validarJWTapi =  (req,res=response) => {
  const token = req.cookies.token;
  if (!token){
    return res.status(401).json({
      msg:"No hay token en la petición"
    })
  }
  try {
    const {uid} = jwt.verify(token,process.env.PRIVATEKEY); 
    return res.status(200).json({uid});
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg:'Token no válido'
    })
  }
}

module.exports = {
  validarJWTapi
}