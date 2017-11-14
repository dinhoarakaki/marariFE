var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newTipoMedida:{
            id:'',
            descricao:''
        },
        tiposMedida:[]
    },
    mounted:function(){
        this.findAll();
        this.valida_update();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/tipomedida/todos")
                .then(function (res) {
                    this.tiposMedida = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
        },
        updateTipoMedida: function () {
            this.$http.put("http://localhost:8080/tipomedida/alterar", this.newTipoMedida)
                .then(function(res) {
                    window.alert("Tipo de Medida Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newTipoMedida.id==""){
                this.add();
            }else {
                this.updateTipoMedida();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/tipomedida/salvar", this.newTipoMedida)
                .then(function(res) {
                    window.alert("Tipo de Medida Cadastrado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/tipomedida-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteTipoMedida: function (i) {
            this.$http.delete("http://localhost:8080/tipomedida/" + (i))
                .then(function (res) {
                    window.alert("Tipo de Medida Deletado");
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
            open_file('tipoMedida.html');
        },
        valida_update: function () {
            if (update_global != '') {
                var aux_update = JSON.parse(update_global);
                //Não esta funcionando
                this.newTipoMedida = aux_update;
                update_global = ''; // LIMPANDO VARIÁVEL GLOBAL DE ATUALIZAÇÃO
            }
        },
        clear: function () {
            this.newTipoMedida = {
                id:'',
                descricao:''
            },
                setTimeout(this.back_home, 600);
        }
    }

})