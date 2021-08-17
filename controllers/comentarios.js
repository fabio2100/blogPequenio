const comentarios = require("../models/comentario");

const comentariosGet = async function(req, res){
  const todosLosComentarios = await comentarios.find().sort({fechaCarga:-1});
  res.json(todosLosComentarios);
};

const comentariosPost = async function(req, res){
  const body = req.body;
  const data = {
    autor :body.autor,
    descripcion : body.descripcion,
    fechaCarga : new Date(),
  };

  const comentario = new comentarios(data);
  console.log(comentario);
  await comentario.save();
  res.status(201).json({comentario})
}

const comentariosPut = async function(req,res){
  const data = req.body;
  data.fechaCarga = new Date();
  const _id = data._id;
  let resultado = await comentarios.findByIdAndUpdate(_id,data);
  res.status(201).json(resultado)
}

const comentariosDelete = async function(req,res){
  const id = req.params.id;
  let resultado = await comentarios.deleteOne({_id:id});
  res.status(201).json('eliminado');
}

module.exports = {comentariosGet,comentariosPost,comentariosPut,comentariosDelete}