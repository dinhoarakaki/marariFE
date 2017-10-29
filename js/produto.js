var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newProduto:{
            id:'',
            descricao:'',
            codBarras:'',
            fornecedor:'',
            precoCusto:'',
            precoVenda:'',
            precoMinVenda:'',
            precoMaxVenda:'',
            comissaoVenda:'',
            qtdEstoque:'',
            qtdMinEstoque:'',
            altura:'',
            peso:'',
            largura:'',
            profundidade:'',
            medidaProduto:'',
            tipoProduto:'',
            usuario:'',
            validade:''
        },
        produtos:[],
        fornecedores:[],
        tiposProduto:[],
        usuarios:[]
    },
    mounted:function(){
        this.findAll();
        this.findAllFornecedores();
        this.findAllTiposProduto();
        this.findAllUsuarios();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/produto/todos")
                .then(function (res) {
                    this.produtos = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllFornecedores:function(){
            this.$http.get("http://localhost:8080/fornecedor/todos")
                .then(function (res) {
                    this.fornecedores = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllTiposProduto:function(){
            this.$http.get("http://localhost:8080/tipoproduto/todos")
                .then(function (res) {
                    this.produtos = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllUsuarios:function(){
            this.$http.get("http://localhost:8080/usuario/todos")
                .then(function (res) {
                    this.usuarios = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        updateProduto: function () {
            this.$http.put("http://localhost:8080/produto/alterar", this.newProduto)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newProduto.remoteId==""){
                this.add();
            }else {
                this.updateProduto();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/produto/salvar", this.newProduto)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        deleteProduto: function (i) {
            this.$http.delete("http://localhost:8080/produto/" + (i))
                .then(function (res) {
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });
        },
        prepareUpdate :function(i){
            this.newProduto=  Vue.util.extend({},this.produtos[i]);
        },
        clear: function () {
            this.newProduto = {
                id:'',
                descricao:'',
                codBarras:'',
                fornecedor:'',
                precoCusto:'',
                precoVenda:'',
                precoMinVenda:'',
                precoMaxVenda:'',
                comissaoVenda:'',
                qtdEstoque:'',
                qtdMinEstoque:'',
                altura:'',
                peso:'',
                largura:'',
                profundidade:'',
                medidaProduto:'',
                tipoProduto:'',
                usuario:'',
                validade:''
            }
        }
    }

})