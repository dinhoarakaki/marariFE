var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newEndereco:{
            id:'',
            estado:'',
            cidade:'',
            cep:'',
            bairro:'',
            numero:''
        },
        enderecos:[]
    },
    mounted:function(){
        this.findAll();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/endereco/todos/")
                .then(function (res) {
                    this.enderecos = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        updateEndereco: function () {
            this.$http.put("http://localhost:8080/endereco/private/edit", this.newEndereco)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newEndereco.remoteId==""){
                this.add();
            }else {
                this.updateEndereco();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/endereco/private/savenofile", this.newEndereco)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        deleteEndereco: function (i) {
            this.$http.delete("http://localhost:8080/endereco/private/" + (i))
                .then(function (res) {
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });
        },
        prepareUpdate :function(i){
            this.newEndereco=  Vue.util.extend({},this.enderecos[i]);
        },
        clear: function () {
            this.newEndereco = {
                id:'',
                estado:'',
                cidade:'',
                cep:'',
                bairro:'',
                numero:''
            }
        }
    }

})