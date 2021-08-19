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
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref : 'Usuario',
    required: true
  }
})


module.exports = model('comentarios',comentarioModel)