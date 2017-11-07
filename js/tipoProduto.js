var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newTipoProduto:{
            id:'',
            descricao:''
        },
        tiposProduto:[]
    },
    mounted:function(){
        this.findAll();
        this.valida_update();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/tipoproduto/todos")
                .then(function (res) {
                    this.tiposProduto = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
        },
        updateTipoProduto: function () {
            this.$http.put("http://localhost:8080/tipoproduto/alterar", this.newTipoProduto)
                .then(function(res) {
                    window.alert("Tipo de Produto Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newTipoProduto.id==""){
                this.add();
            }else {
                this.updateTipoProduto();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/tipoproduto/salvar", this.newTipoProduto)
                .then(function(res) {
                    window.alert("Tipo de Produto Cadastrado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/tipoProduto-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteTipoProduto: function (i) {
            this.$http.delete("http://localhost:8080/tipoproduto/" + (i))
                .then(function (res) {
                    window.alert("Tipo de Produto Deletado");
                    setTimeout(this.back_home, 600);
                }, function (res) {
                    console.log(res);
                    alert("Um erro ocorreu :(");
                });
        },
        prepareUpdate :function(c){
            console.log(c.id);
            update_global = '';
            update_global = JSON.stringify(c);
            console.log(c);
            open_file('tipoProduto.html');
        },
        valida_update: function () {
            if (update_global != '') {
                var aux_update = JSON.parse(update_global);
                //Não esta funcionando
                this.newTipoProduto = aux_update;
                update_global = ''; // LIMPANDO VARIÁVEL GLOBAL DE ATUALIZAÇÃO
            }
        },
        clear: function () {
            this.newTipoProduto = {
                id:'',
                descricao:''
            },
                setTimeout(this.back_home, 600);
        }
    }

})