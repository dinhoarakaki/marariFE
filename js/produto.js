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
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
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
                    console.log(res.body);
                    this.tiposProduto = res.body;
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
                    window.alert("Produto Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newProduto.id==""){
                this.add();
            }else {
                this.updateProduto();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/produto/salvar", this.newProduto)
                .then(function(res) {
                    window.alert("Produto Adicionado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/produto-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteProduto: function (i) {
            this.$http.delete("http://localhost:8080/produto/" + (i))
                .then(function (res) {
                    window.alert("Produto Deletado");
                    setTimeout(this.back_home, 600);
                }, function (res) {
                    console.log(res);
                    alert("Um erro ocorreu :(");
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
            },
                setTimeout(this.back_home, 600);
        }
    },
    mounted: function(){
        $('#pc,#pv,#pmin,#pmax').mask('000.000.000.000.000,00', {reverse: true});
    }

})