var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newPedido:{
            id:'',
            formaPagamento:'',
            cliente:''
        },
        pedidos:[],
        formasPagamento:[],
        clientes:[],
        itensPedido:[]
    },
    mounted:function(){
        this.findAll();
        this.findAllFormasPagamento();
        this.findAllClientes();
        this.findAllItensPedido();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/pedido/todos")
                .then(function (res) {
                    this.pedidos = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
        },
        findAllFormasPagamento:function() {
            this.$http.get("http://localhost:8080/formapagamento/todos")
                .then(function(res){
                    this.formasPagamento = res.body;
                }, function (res){
                    console.log(res);
                });
        },findAllItensPedido:function() {
            this.$http.get("http://localhost:8080/itemPedido/todos")
                .then(function(res){
                    this.itensPedido = res.body;
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
        updatePedido: function () {
            this.$http.put("http://localhost:8080/pedido/alterar", this.newPedido)
                .then(function(res) {
                    window.alert("Pedido Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newPedido.id==""){
                this.add();
            }else {
                this.updatePedido();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/pedido/salvar", this.newPedido)
                .then(function(res) {
                    window.alert("Pedido Adiconado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/pedido-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deletePedido: function (i) {
            this.$http.delete("http://localhost:8080/pedido/" + (i))
                .then(function (res) {
                    window.alert("Pedido Deletado");
                    setTimeout(this.back_home, 600);
                }, function (res) {
                    console.log(res);
                    alert("Um erro ocorreu :(");
                });
        },
        prepareUpdate :function(i){
            this.newPedido=  Vue.util.extend({},this.pedidos[i]);
        },
        clear: function () {
            this.newPedido = {
                id:'',
                itemPedido:'',
                quantidade:'',
                valor:'',
                formaPagamento:'',
                cliente:''
            },
                setTimeout(this.back_home, 600);
        }
    }

})