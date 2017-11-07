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
        this.valida_update();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/tipodespesa/todos")
                .then(function (res) {
                    this.tiposDespesa = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
        },
        updateTipoDespesa: function () {
            this.$http.put("http://localhost:8080/tipodespesa/alterar", this.newTipoDespesa)
                .then(function(res) {
                    window.alert("Tipo de Despesa Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newTipoDespesa.id==""){
                this.add();
            }else {
                this.updateTipoDespesa();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/tipodespesa/salvar", this.newTipoDespesa)
                .then(function(res) {
                    window.alert("Tipo de Despesa Cadastrado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/tipoDespesa-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteTipoDespesa: function (i) {
            this.$http.delete("http://localhost:8080/tipodespesa/" + (i))
                .then(function (res) {
                    window.alert("Tipo de Despesa Deletado");
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
            open_file('tipoDespesa.html');
        },
        valida_update: function () {
            if (update_global != '') {
                var aux_update = JSON.parse(update_global);
                //Não esta funcionando
                this.newTipoDespesa = aux_update;
                update_global = ''; // LIMPANDO VARIÁVEL GLOBAL DE ATUALIZAÇÃO
            }
        },
        clear: function () {
            this.newTipoDespesa = {
                id:'',
                descricao:''
            },
                setTimeout(this.back_home, 600);
        }
    }

})