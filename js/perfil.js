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
        this.valida_update();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/perfil/todos")
                .then(function (res) {
                    this.perfis = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
        },
        updatePerfil: function () {
            this.$http.put("http://localhost:8080/perfil/alterar", this.newPerfil)
                .then(function(res) {
                    window.alert("Perfil Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newPerfil.id==""){
                this.add();
            }else {
                this.updatePerfil();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/perfil/salvar", this.newPerfil)
                .then(function(res) {
                    window.alert("Perfil Adicionado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/perfil-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deletePerfil: function (i) {
            this.$http.delete("http://localhost:8080/perfil/" + (i))
                .then(function (res) {
                    window.alert("Perfil Deletado");
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
            open_file('perfil.html');
        },
        valida_update: function () {
            if (update_global != '') {
                var aux_update = JSON.parse(update_global);
                //Não esta funcionando
                this.newPerfil = aux_update;
                update_global = ''; // LIMPANDO VARIÁVEL GLOBAL DE ATUALIZAÇÃO
            }
        },
        clear: function () {
            this.newPerfil = {
                id:'',
                descricao:''
            },
                setTimeout(this.back_home, 600);
        }
    }

})