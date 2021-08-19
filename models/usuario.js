const {Schema,model} = require('mongoose');

const usuarioSchema = Schema({
  nombre:{
    type: String,
    required: [true,'el nombre es obligatorio'],
    unique: true
  },
  password : {
    type: String,
    required: [true,'El password es obligatorio']
  },
  estado: {
    type: Boolean,
    default : true
  }
})


usuarioSchema.methods.toJSON = function(){
  const {__v,password,...usuario} = this.toObject();
  return usuario;
}

module.exports = model('Usuario',usuarioSchema)