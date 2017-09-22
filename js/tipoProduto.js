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
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/tipoProduto/private/")
                .then(function (res) {
                    this.tiposProduto = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        updateTipoProduto: function () {
            this.$http.put("http://localhost:8080/tipoProduto/private/edit", this.newTipoProduto)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newTipoProduto.remoteId==""){
                this.add();
            }else {
                this.updateTipoProduto();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/tipoProduto/private/savenofile", this.newTipoProduto)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        deleteTipoProduto: function (i) {
            this.$http.delete("http://localhost:8080/tipoProduto/private/" + (i))
                .then(function (res) {
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });
        },
        prepareUpdate :function(i){
            this.newTipoProduto=  Vue.util.extend({},this.tiposProduto[i]);
        },
        clear: function () {
            this.newTipoProduto = {
                id:'',
                descricao:''
            }
        }
    }

})