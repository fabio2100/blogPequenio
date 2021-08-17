new Vue({
  el:'#app',
  data:{
    cargarComentarios: false,
    subirComentarios : false,
    listaComentarios: [],
    nuevoComentario : {},
    autorNuevoComentario: '',
    descripcionNuevoComentario: '',
    mostrarEditar : true,
    noEditable : -1,
    comentarioSeleccionado : {}
  },
  methods:{
    recuperarComentarios : function(){ 
      var self = this;
      this.cargarComentarios = true;
      this.subirComentarios = false;
      this.noEditable = -1;
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        weekday : 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }
      axios.get('https://blogcito-fabio.herokuapp.com/api/comentarios')
      .then(
        function(response){
          self.listaComentarios = []
          response.data.forEach(element => {
            let fecha = new Date(element.fechaCarga);
            element.fechaAMostrar = fecha.toLocaleDateString(undefined,options) 
            self.listaComentarios.push(element);         
          });
        }
      )
    },
    mostrarSubirComentario : function(){
      this.cargarComentarios = false;
      this.subirComentarios = true;
    },
    subirComentario : async function(){
      var self = this;
      console.log(this.autorNuevoComentario)
      console.log(this.descripcionNuevoComentario);
      let comentarioJson = {
        'autor':this.autorNuevoComentario,
        'descripcion':this.descripcionNuevoComentario
      }
      let res = await axios.post('https://blogcito-fabio.herokuapp.com/api/comentarios/',comentarioJson)
      .then(function(response){
        self.autorNuevoComentario='';
        self.descripcionNuevoComentario='';
        self.recuperarComentarios();
      });
    },
    borrarComentario : async function(id){
      var self = this;
      let res = await axios.delete('https://blogcito-fabio.herokuapp.com/api/comentarios/'+id)
      .then(function(response){
        //console.log(response)
        self.recuperarComentarios();
      })
    },
    mostrarEditarComentario : function(indice,autor,descripcion,id){
      this.noEditable = indice;
      this.comentarioSeleccionado={
        "autor":autor,
        "descripcion":descripcion,
        "_id":id
      };
    },
    modificarComentario : async function(){
      data = {
        'autor':this.comentarioSeleccionado.autor,
        'descripcion':this.comentarioSeleccionado.descripcion,
        '_id':this.comentarioSeleccionado._id
      }
      let resultado = await axios.put('https://blogcito-fabio.herokuapp.com/api/comentarios/',data);
      this.noEditable=-1;
      this.recuperarComentarios();
    }
  }
})