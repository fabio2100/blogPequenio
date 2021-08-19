const express = require('express');
const { dbConn } = require('../database/config');
const cors = require('cors');
const cookieParser = require('cookie-parser');

class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;

    this.conectarDB();
    this.app.use(express.json())
    this.app.use(cors());
    this.app.use(cookieParser())
    this.app.use(express.static('public'))
    this.comentarios = '/api/comentarios'
    this.app.use(this.comentarios,require('../routes/comentarios'));
    this.usuarios = '/login';
    this.app.use(this.usuarios,require('../routes/usuario'));
    this.auth = '/auth';
    this.app.use(this.auth,require('../routes/auth'));
    this.validarToken = '/validarToken';
    this.app.use(this.validarToken,require('../routes/validarToken'))
  }

  async conectarDB(){
    await dbConn();
  }

  listen(){
    this.app.listen(this.port,()=>{
      console.log("Server listening at port: ",this.port)
    })
  }

}

module.exports = Server