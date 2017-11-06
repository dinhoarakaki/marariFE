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
    created:function(){
        this.findAll();
        this.findAllEnderecos();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/fornecedor/todos")
                .then(function (res) {
                    console.log(res.body);
                    this.fornecedores = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
        },
        findAllEnderecos:function() {
            this.$http.get("http://localhost:8080/endereco/todos")
                .then(function(res){
                    console.log(res.body);
                    this.fornecedores = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        updateFornecedor: function () {
            this.$http.put("http://localhost:8080/fornecedores/alterar", this.newFornecedor)
                .then(function(res) {
                    window.alert("Fornecedor Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newFornecedor.id==""){
                this.add();
            }else {
                this.updateFornecedor();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/fornecedor/salvar", this.newFornecedor)
                .then(function(res) {
                    window.alert("Fornecedor Adicionado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/fornecedor-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteFornecedor: function (i) {
            this.$http.delete("http://localhost:8080/fornecedor/" + (i))
                .then(function (res) {
                    window.alert("Fornecedor Deletado");
                    setTimeout(this.back_home, 600);
                }, function (res) {
                    console.log(res);
                    alert("Um erro ocorreu :(");
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
            },
                setTimeout(this.back_home, 600);
        }
    }

})