var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newCaixa:{
            id:'',
            data:'',
            descricao:'',
            valor:'',
            status:'',
            formaPagamento:'',
            tipoDespesa:'',
            cliente:'',
            fornecedor:''
        },
        caixas:[],
        formasPagamento:[],
        tiposDespesa:[],
        clientes:[],
        fornecedores:[]
    },
    mounted:function(){
        this.findAll();
        this.findAllFormasPagamento();
        this.findAllTiposDespesa();
        this.findAllClientes();
        this.findAllFornecedores();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/caixa/private/")
                .then(function (res) {
                    this.caixas = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllFormasPagamento:function() {
        this.$http.get("http://localhost:8080/formaPagamento/private/")
            .then(function(res){
               this.formasPagamento = res.body;
            }, function (res){
                console.log(res);
            });
        },
        findAllTiposDespesa:function() {
            this.$http.get("http://localhost:8080/tipoDespesa/private/")
                .then(function(res){
                    this.tiposDespesa = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        findAllFornecedores:function(){
            this.$http.get("http://localhost:8080/fornecedor/private/")
                .then(function(res){
                    this.fornecedores = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        findAllClientes:function(){
            this.$http.get("http://localhost:8080/cliente/private/")
                .then(function(res){
                    this.clientes = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        updateCaixa: function () {
            this.$http.put("http://localhost:8080/caixa/private/edit", this.newCaixa)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newCaixa.remoteId==""){
                this.add();
            }else {
                this.updateCaixa();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/caixa/private/savenofile", this.newCaixa)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        deleteCaixa: function (i) {
            this.$http.delete("http://localhost:8080/caixa/private/" + (i))
                .then(function (res) {
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });
        },
        prepareUpdate :function(i){
            this.newCaixa=  Vue.util.extend({},this.caixas[i]);
        },
        clear: function () {
            this.newCaixa = {
                id:'',
                data:'',
                descricao:'',
                valor:'',
                status:'',
                formaPagamento:'',
                tipoDespesa:'',
                cliente:'',
                fornecedor:''
            }
        }
    }

})