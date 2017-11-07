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
            numero:'',
            rua:''
        },
        enderecos:[]
    },
    mounted:function(){
        this.findAll();
        this.valida_update();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/endereco/todos")
                .then(function (res) {
                    console.log(res.body);
                    this.enderecos = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
        },
        updateEndereco: function () {
            this.$http.put("http://localhost:8080/endereco/alterar", this.newEndereco)
                .then(function(res) {
                    window.alert("Endereço Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newEndereco.id==""){
                this.add();
            }else {
                this.updateEndereco();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/endereco/salvar", this.newEndereco)
                .then(function(res) {
                    window.alert("Endereço Adicionado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/endereco-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteEndereco: function (i) {
            this.$http.delete("http://localhost:8080/endereco/" + (i))
                .then(function (res) {
                    window.alert("Endereço Deletado");
                    setTimeout(this.back_home, 600);
                }, function (res) {
                    console.log(res);
                    window.alert("Um erro ocorreu :(")
                });
        },
        prepareUpdate :function(c){
            console.log(c.id);
            update_global = '';
            update_global = JSON.stringify(c);
            console.log(c);
            open_file('endereco.html');
        },
        valida_update: function () {
            if (update_global != '') {
                var aux_update = JSON.parse(update_global);
                //Não esta funcionando
                this.newEndereco = aux_update;
                update_global = ''; // LIMPANDO VARIÁVEL GLOBAL DE ATUALIZAÇÃO
            }
        },
        clear: function () {
            this.newEndereco = {
                id:'',
                estado:'',
                cidade:'',
                cep:'',
                bairro:'',
                numero:''
            },
                setTimeout(this.back_home, 600);
        }
    }

})