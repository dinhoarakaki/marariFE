var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newItemPedido:{
            id:'',
            produto:'',
            quantidade:''
        },
        produtos:[]
    },
    mounted:function(){
        this.findAll();
    },
    methods: {
        findAll:function() {
            this.$http.get("http://localhost:8080/produto/todos")
                .then(function(res){
                    this.produtos = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        updateItemPedido: function () {
            this.$http.put("http://localhost:8080/itemPedido/alterar", this.newPedido)
                .then(function(res) {
                    window.alert("Pedido Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newItemPedido.id==""){
                this.add();
            }else {
                this.updateItemPedido();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/itemPedido/salvar", this.newPedido)
                .then(function(res) {
                    window.alert("Pedido Adiconado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/pedido.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deletePedido: function (i) {
            this.$http.delete("http://localhost:8080/itemPedido/" + (i))
                .then(function (res) {
                    window.alert("Item Removido");
                    setTimeout(this.back_home, 600);
                }, function (res) {
                    console.log(res);
                    alert("Um erro ocorreu :(");
                });
        },
        prepareUpdate :function(i){
            this.newItemPedido=  Vue.util.extend({},this.pedidos[i]);
        },
        clear: function () {
            this.newItemPedido = {
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
                setTimeout(this.back_home, 600);
        }
    }

})