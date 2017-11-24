var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newPedido:{
            id:'',
            data:'',
            formaPagamento:'',
            cliente:'',
            itensPedido:[],
            valorTotal:'',
            info:'',
            usuario:''
        },
        newItemPedido:{
            id:'',
            produto:'',
            quantidade:''
        },
        produtos:[],
        pedidos:[],
        formasPagamento:[],
        clientes:[],
        usuarios:[]
    },
    created:function(){
        this.findAll();
        this.findAllFormasPagamento();
        this.findAllClientes();
        this.findAllProdutos();
        this.findAllItensPedido();
        this.findAllUsuarios();
    },
    methods: {
        clearItem: function () {
            this.newItemPedido = {
                id:'',
                produto:'',
                quantidade:''
            }
        },
        updateItem: function () {
            console.log(this.newItemPedido.id);
            // this.$http.put("http://localhost:8080/pedido/alterar", this.newPedido)
            //     .then(function(res) {
            //         window.alert("Pedido Editado");
            //         this.findAll();
            //     }, function (res){
            //         window.alert(res.body.mensagem);
            //     });
        },
        saveItem:function(){
            console.log(this.newItemPedido.id+"if >= 0 should edit");
            console.log(this.newItemPedido.valorVenda);
            console.log(this.newItemPedido.quantidade);
            console.log(this.newItemPedido.produto);
            if(this.newItemPedido.id===""){
                this.addItem();
            }else {
                this.newPedido.itensPedido.splice(this.newItemPedido.id, 1, this.newItemPedido);
            }
            this.clearItem();
        },
        addItem: function () {

            if (this.newItemPedido.produto !== "" && this.newItemPedido.quantidade !== "" && this.newItemPedido.valorVenda !== "" ) {
               this.newPedido.itensPedido.push(this.newItemPedido);
            }else{
                window.alert("Entradas inválidas");
            }
        },
        prepareUpdateItem: function (i) {
            console.log(i);
            this.newItemPedido = Vue.util.extend({},this.newPedido.itensPedido[i]);
            this.newItemPedido.id = i;
        },
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
        },
        findAllItensPedido:function() {
            this.$http.get("http://localhost:8080/itemPedido/todos")
                .then(function(res){
                    this.itensPedido = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        findAllUsuarios:function() {
            this.$http.get("http://localhost:8080/usuario/todos")
                .then(function(res){
                    this.usuarios = res.body;
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
        findAllProdutos: function () {
            this.$http.get("http://localhost:8080/produto/todos")
                .then(function(res){
                    this.produtos = res.body;
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
            console.log("pedido "+this.newPedido);
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
                data:'',
                formaPagamento:'',
                cliente:'',
                itensPedido:[],
                valor:''
            },
                setTimeout(this.back_home, 600);
        }
    },
    mounted: function(){
        $('#valor').mask('000.000.000.000.000,00', {reverse: true});
        $("#btn-salvar").on('click',function () {
            $(this).addClass("d-none");
            $(this).closest('td').find("#btn-editar").removeClass("b-none");
            $(this).clone('tr').css('pointer-events','none');
        });
        $("#btn-editar").on('click',function () {
            $(this).addClass("d-none");
            $(this).closest('td').find("#btn-salvar").removeClass("b-none");
            $(this).clone('tr').css('pointer-events','normal');
        });
    }

})