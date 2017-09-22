var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newPerfil:{
            id:'',
            descricao:''
        },
        perfis:[]
    },
    mounted:function(){
        this.findAll();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/perfil/private/")
                .then(function (res) {
                    this.perfis = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        updatePerfil: function () {
            this.$http.put("http://localhost:8080/perfil/private/edit", this.newPerfil)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newPerfil.remoteId==""){
                this.add();
            }else {
                this.updatePerfil();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/perfil/private/savenofile", this.newPerfil)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        deletePerfil: function (i) {
            this.$http.delete("http://localhost:8080/perfil/private/" + (i))
                .then(function (res) {
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });
        },
        prepareUpdate :function(i){
            this.newPerfil=  Vue.util.extend({},this.perfis[i]);
        },
        clear: function () {
            this.newPerfil = {
                id:'',
                descricao:''
            }
        }
    }

})