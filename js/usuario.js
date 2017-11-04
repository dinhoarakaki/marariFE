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
            this.$http.get("http://localhost:8080/usuario/todos")
                .then(function (res) {
                    this.usuarios = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllPerfis: function () {
            this.$http.get("http://localhost:8080/perfil/todos/")//fazer
                .then(function (res) {
                    this.perfis = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        updateUsuario: function () {
            this.$http.put("http://localhost:8080/usuario/alterar", this.newUsuario)
                .then(function(res) {
                    window.alert("Usuário Editado");
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
            this.$http.post("http://localhost:8080/usuario/salvar", this.newcliente)
                .then(function(res) {
                    window.alert("Usuário Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/usuario-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteUsuario: function (i) {
            this.$http.delete("http://localhost:8080/usuario/" + (i))
                .then(function (res) {
                    window.alert("Usuário Deletado");
                    setTimeout(this.back_home, 250);
                }, function (res) {
                    console.log(res);
                    alert("Um erro ocorreu :(");
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
            },
                setTimeout(this.back_home, 250);
        }
    }

})