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
            this.$http.get("http://localhost:8080/caixa/todos")
                .then(function (res) {
                    this.caixas = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllFormasPagamento:function() {
        this.$http.get("http://localhost:8080/formapagamento/todos")
            .then(function(res){
               this.formasPagamento = res.body;
            }, function (res){
                console.log(res);
            });
        },
        findAllTiposDespesa:function() {
            this.$http.get("http://localhost:8080/tipodespesa/todos")
                .then(function(res){
                    this.tiposDespesa = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        findAllFornecedores:function(){
            this.$http.get("http://localhost:8080/fornecedor/todos")
                .then(function(res){
                    this.fornecedores = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        findAllClientes:function(){
            this.$http.get("http://localhost:8080/cliente/todos")
                .then(function(res){
                    this.clientes = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        updateCaixa: function () {
            this.$http.put("http://localhost:8080/caixa/alterar", this.newCaixa)
                .then(function(res) {
                    window.alert("Caixa Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newCaixa.id==""){
                this.add();
            }else {
                this.updateCaixa();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/caixa/salvar", this.newCaixa)
                .then(function(res) {
                    window.alert("Caixa Adiconado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/caixa-ist.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteCaixa: function (i) {
            this.$http.delete("http://localhost:8080/caixa/" + (i))
                .then(function (res) {
                    window.alert("Caixa Deletado");
                    setTimeout(this.back_home, 250);
                }, function (res) {
                    console.log(res);
                    alert("Um erro ocorreu :(");
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
            },
                setTimeout(this.back_home, 250);
        }
    }

})