var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newFormaPagamento:{
            id:'',
            descricao:''
        },
        formasPagamento:[]
    },
    mounted:function(){
        this.findAll();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/formaPagamento/private/")
                .then(function (res) {
                    this.formasPagamento = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        updateFormaPagamento: function () {
            this.$http.put("http://localhost:8080/formaPagamento/private/edit", this.newFormaPagamento)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newFormaPagamento.remoteId==""){
                this.add();
            }else {
                this.updateFormaPagamento();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/formaPagamento/private/savenofile", this.newFormaPagamento)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        deleteFormaPagamento: function (i) {
            this.$http.delete("http://localhost:8080/formaPagamento/private/" + (i))
                .then(function (res) {
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });
        },
        prepareUpdate :function(i){
            this.newFormaPagamento=  Vue.util.extend({},this.formasPagamento[i]);
        },
        clear: function () {
            this.newFormaPagamento = {
                id:'',
                nome:'',
                telefone:'',
                endereco:'',
                regiao:''
            }
        }
    }

})