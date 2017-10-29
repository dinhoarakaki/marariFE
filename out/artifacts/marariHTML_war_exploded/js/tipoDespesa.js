var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newTipoDespesa:{
            id:'',
            descricao:''
        },
        tiposDespesa:[]
    },
    mounted:function(){
        this.findAll();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/tipoDespesa/private/")
                .then(function (res) {
                    this.tiposDespesa = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        updateTipoDespesa: function () {
            this.$http.put("http://localhost:8080/tipoDespesa/private/edit", this.newTipoDespesa)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newTipoDespesa.remoteId==""){
                this.add();
            }else {
                this.updateTipoDespesa();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/tipoDespesa/private/savenofile", this.newTipoDespesa)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        deleteTipoDespesa: function (i) {
            this.$http.delete("http://localhost:8080/tipoDespesa/private/" + (i))
                .then(function (res) {
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });
        },
        prepareUpdate :function(i){
            this.newTipoDespesa=  Vue.util.extend({},this.tiposDespesa[i]);
        },
        clear: function () {
            this.newTipoDespesa = {
                id:'',
                descricao:''
            }
        }
    }

})