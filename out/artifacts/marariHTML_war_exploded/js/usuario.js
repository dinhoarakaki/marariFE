var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newUsuario:{
            id:'',
            nome:'',
            email:'',
            senha:'',
            perfil:''
        },
        usuarios:[],
        perfis:[]
    },
    mounted:function(){
        this.findAll();
        this.findAllPerfis();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/usuario/private/")
                .then(function (res) {
                    this.usuarios = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllPerfis: function () {
            this.$http.get("http://localhost:8080/perfil/private/")
                .then(function (res) {
                    this.perfis = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        updateUsuario: function () {
            this.$http.put("http://localhost:8080/usuario/private/edit", this.newUsuario)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newUsuario.remoteId==""){
                this.add();
            }else {
                this.updateUsuario();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/usuario/private/savenofile", this.newcliente)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        deleteUsuario: function (i) {
            this.$http.delete("http://localhost:8080/usuario/private/" + (i))
                .then(function (res) {
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });
        },
        prepareUpdate :function(i){
            this.newUsuario=  Vue.util.extend({},this.usuarios[i]);
        },
        clear: function () {
            this.newUsuario = {
                id:'',
                nome:'',
                email:'',
                senha:'',
                perfil:''
            }
        }
    }

})