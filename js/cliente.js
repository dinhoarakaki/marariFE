var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newCliente:{
            id:'',
            nome:'',
            email:'',
            endereco:'',
            cpfCnpj:'',
            rg:'',
            telefone:'',
            info:''
        },
        enderecos:[],
        clientes:[]
    },
    created:function(){
        this.findAll();
        this.findAllEnderecos();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/cliente/todos")
                .then(function (res) {
                    this.clientes = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllEnderecos:function() {
            this.$http.get("http://localhost:8080/endereco/todos")
                .then(function(res){
                    this.enderecos = res.body;
                    console.log(this.enderecos);
                }, function (res){
                    console.log(res);
                });


        },
        updateCliente: function () {
            this.$http.put("http://localhost:8080/cliente/alterar", this.newCliente)
                .then(function(res) {
                    window.alert("Cliente Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newCliente.id==""){
                this.add();
            }else {
                this.updateCliente();
            }
            this.clear();
        },
        add: function () {
            console.log(this.newCliente);
            this.$http.post("http://localhost:8080/cliente/salvar", this.newCliente)
                .then(function(res) {
                    window.alert("Cliente Adicionado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/cliente-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteCliente: function (i) {
            this.$http.delete("http://localhost:8080/cliente/" + (i))
                .then(function (res) {
                    window.alert("Caixa Deletado");
                    setTimeout(this.back_home, 250);
                }, function (res) {
                    console.log(res);
                    alert("Um erro ocorreu :(");
                });
        },
        prepareUpdate :function(i){
            this.newCliente=  Vue.util.extend({},this.clientes[i]);
        },
        clear: function () {
            this.newCliente = {
                id:'',
                nome:'',
                email:'',
                endereco:'',
                cpfCnpj:'',
                rg:'',
                telefone:'',
                info:''
            },
                setTimeout(this.back_home, 250);
        }
    }

})