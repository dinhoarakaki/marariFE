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
    mounted:function(){
        this.findAll();
        this.findAllEnderecos();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/cliente/private/")
                .then(function (res) {
                    this.clientes = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllEnderecos:function() {
            this.$http.get("http://localhost:8080/endereco/private/")
                .then(function(res){
                    this.enderecos = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        updateCliente: function () {
            this.$http.put("http://localhost:8080/cliente/private/edit", this.newCliente)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newCliente.remoteId==""){
                this.add();
            }else {
                this.updateCliente();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/cliente/private/savenofile", this.newCliente)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        deleteCliente: function (i) {
            this.$http.delete("http://localhost:8080/cliente/private/" + (i))
                .then(function (res) {
                    this.findAll();
                }, function (res) {
                    console.log(res);
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
            }
        }
    }

})