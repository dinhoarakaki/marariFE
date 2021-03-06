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
        this.valida_update();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/usuario/todos")
                .then(function (res) {
                    this.usuarios = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
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
            if(this.newUsuario.id==""){
                this.add();
            }else {
                this.updateUsuario();
            }
            this.clear();
        },
        add: function () {
            console.log(this.newUsuario);
            this.$http.post("http://localhost:8080/usuario/salvar", this.newUsuario)
                .then(function(res) {
                    window.alert("Usuário Cadastrado");
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
                    setTimeout(this.back_home, 600);
                }, function (res) {
                    console.log(res);
                    alert("Um erro ocorreu :(");
                });
        },
        prepareUpdate :function(c){
            update_global = '';
            update_global = JSON.stringify(c);
            open_file('usuario.html');
        },valida_update: function () {
            if (update_global != '') {
                var aux_update = JSON.parse(update_global);
                //Não esta funcionando
                this.newUsuario = aux_update;
                update_global = ''; // LIMPANDO VARIÁVEL GLOBAL DE ATUALIZAÇÃO
            }
        },
        clear: function () {
            this.newUsuario = {
                id:'',
                nome:'',
                email:'',
                senha:'',
                perfil:''
            },
                setTimeout(this.back_home, 600);
        }
    }

})