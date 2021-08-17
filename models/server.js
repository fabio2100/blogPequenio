const express = require('express');
const { dbConn } = require('../database/config');
const cors = require('cors');

class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;

    this.conectarDB();
    this.app.use(express.json())
    this.app.use(cors());
    this.app.use(express.static('public'))
    this.comentarios = '/api/comentarios'
    this.app.use(this.comentarios,require('../routes/comentarios'))
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