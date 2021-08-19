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
    comentarioSeleccionado : {},
    ventanaUsuario : false,
    usuario: '',
    password: '',
    passwordVerificacion: '',
    usuarioMismoNombre: false,
    usuarioCreado: false,
    ventanaIngresar : false,
    errorAutenticacion : false,
    autenticacionCorrecta: false
  },
  created: function(){
    var self = this;
    axios.post('http://localhost:8080/validarToken')
    .then(function(data){
      self.autenticacionCorrecta = true;
      self.usuario = self.getCookie('nombre');
    })
    .catch(function(error){
      self.autenticacionCorrecta = false;
    })
  },
  methods:{
    recuperarComentarios : function(){ 
      var self = this;
      this.cargarComentarios = true;
      this.subirComentarios = false;
      this.ventanaUsuario = false;
      this.ventanaIngresar = false;
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
      axios.get('http://localhost:8080/api/comentarios')
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
      this.ventanaUsuario = false;
      this.ventanaIngresar = false;
    },
    subirComentario : async function(){
      var self = this;
      let comentarioJson = {
        'autor':this.autorNuevoComentario,
        'descripcion':this.descripcionNuevoComentario
      }
      let res = await axios.post('http://localhost:8080/api/comentarios/',comentarioJson)
      .then(function(response){
        self.autorNuevoComentario='';
        self.descripcionNuevoComentario='';
        self.recuperarComentarios();
      });
    },
    borrarComentario : async function(id){
      var self = this;
      let res = await axios.delete('http://localhost:8080/api/comentarios/'+id)
      .then(function(response){
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
      let resultado = await axios.put('http://localhost:8080/api/comentarios/',data);
      this.noEditable=-1;
      this.recuperarComentarios();
    },
    mostrarVentanaUsuario : function(){
      this.ventanaUsuario = true;
      this.cargarComentarios = false;
      this.subirComentarios = false;
      this.ventanaIngresar = false;
    },
    crearUsuario :async function(){
      var self = this;
      if(this.password == this.passwordVerificacion && this.password.length>3){
        axios.post('http://localhost:8080/login/',{'nombre':this.usuario,'password':this.password})
        .then(function(response){
          self.usuarioMismoNombre = false;
          self.usuarioCreado = true;
          self.autenticacionCorrecta = false;
          document.cookie = "nombre=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"
          document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"
          setTimeout(()=>{self.usuarioCreado = false;self.mostrarVentanaIngresar()},3000);
        }).catch(function(error){
          self.usuarioMismoNombre = true;
        })
      }
    },
    mostrarVentanaIngresar: function(){
      this.ventanaIngresar = true;
      this.subirComentarios = false;
      this.cargarComentarios= false;
      this.ventanaUsuario = false;
    },
    ingresarUsuario : function(){
      var self = this;
      axios.post('http://localhost:8080/auth/',{'nombre':this.usuario,'password':this.password})
      .then(
        function(response){
          if (response.status==200){
            self.autenticacionCorrecta = true;
            document.cookie = "nombre="+response.data.nombre+";max-age=600";
            document.cookie = "token="+response.data.token+";max-age=600";
          }
        }
      ).catch(function(error){
        console.log(error)
        document.cookie = "nombre=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        self.autenticacionCorrecta = false;
        self.errorAutenticacion = true;
        self.usuario = '';
        self.password = '';
        setTimeout(()=>{self.errorAutenticacion=false},3000)
      })
    },
    cerrarSesion : function(){
      document.cookie = "nombre=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"
      this.autenticacionCorrecta = false;
      this.usuario = '',
      this.password = ''
    },
    getCookie :function(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  }
})
