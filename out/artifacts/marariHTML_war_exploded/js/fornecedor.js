var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newFornecedor:{
            id:'',
            nome:'',
            endereco:'',
            cpfCnpj:'',
            rgIe:'',
            telefone:'',
            contato:'',
            info:'',
            email:''
        },
        enderecos:[],
        fornecedores:[]
    },
    mounted:function(){
        this.findAll();
        this.findAllRegioes();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/fornecedor/private/")
                .then(function (res) {
                    this.fornecedores = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllEnderecos:function() {
            this.$http.get("http://localhost:8080/fornecedor/private/")
                .then(function(res){
                    this.fornecedores = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        updateFornecedor: function () {
            this.$http.put("http://localhost:8080/fornecedores/private/edit", this.newFornecedor)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newFornecedor.remoteId==""){
                this.add();
            }else {
                this.updateFornecedor();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/fornecedor/private/savenofile", this.newFornecedor)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        deleteFornecedor: function (i) {
            this.$http.delete("http://localhost:8080/fornecedor/private/" + (i))
                .then(function (res) {
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });
        },
        prepareUpdate :function(i){
            this.newFornecedor=  Vue.util.extend({},this.fornecedores[i]);
        },
        clear: function () {
            this.newFornecedor = {
                id:'',
                nome:'',
                endereco:'',
                cpfCnpj:'',
                rgIe:'',
                telefone:'',
                contato:'',
                info:'',
                email:''
            }
        }
    }

})