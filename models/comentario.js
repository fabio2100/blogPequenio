const {Schema,model} = require('mongoose');

const comentarioModel = Schema({
  descripcion : {
    type: String,
  },
  autor : {
    type: String,
  },
  fechaCarga : {
    type: Date,
  }
})


module.exports = model('comentarios',comentarioModel)