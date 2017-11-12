var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newCliente:{
            id:'',
            nome:'',
            email:'',
            endereco:'',
            cpfCnpj:'',
            rg:'',
            telefone:'',
            info:''
        },
        newEndereco:{
            id:'',
            estado:'',
            cidade:'',
            cep:'',
            bairro:'',
            numero:'',
            rua:''
        },
        enderecos:[],
        clientes:[]
    },
    created:function(){
        this.findAll();
        //this.findAllEnderecos();
        this.valida_update();
        this.findParametro();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/cliente/todos")
                .then(function (res) {
                    this.clientes = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
        },
        findAllEnderecos:function() {
            this.$http.get("http://localhost:8080/endereco/todos")
                .then(function(res){
                    this.enderecos = res.body;
                    console.log(this.enderecos);
                }, function (res){
                    console.log(res);
                });


        },
        findParametro:function () {
            this.$http.get("http://localhost:8080/cliente/parametro?parametro=gf")
                .then(function (res) {
                    console.log("parametro");
                    console.log(res.body);
                }, function (res) {
                    console.log(res);
                });
        },
        updateCliente: function () {
            this.$http.put("http://localhost:8080/cliente/alterar", this.newCliente)
                .then(function(res) {
                    window.alert("Cliente Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newCliente.id==""){
                this.add();
            }else {
                this.updateCliente();
            }
            this.clear();
        },
        add: function () {
            console.log(this.newCliente);
            this.$http.post("http://localhost:8080/cliente/salvar", this.newCliente)
                .then(function(res) {
                    window.alert("Cliente Adicionado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/cliente-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteCliente: function (i) {
            this.$http.delete("http://localhost:8080/cliente/" + (i))
                .then(function (res) {
                    window.alert("Caixa Deletado");
                    setTimeout(this.back_home, 250);
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
            open_file('cliente.html');
        },valida_update: function () {
            if (update_global != '') {
                var aux_update = JSON.parse(update_global);
                //Não esta funcionando
                this.newCliente = aux_update;
                update_global = ''; // LIMPANDO VARIÁVEL GLOBAL DE ATUALIZAÇÃO
            }
        },
        clear: function () {
            this.newCliente = {
                id:'',
                nome:'',
                email:'',
                endereco:'',
                cpfCnpj:'',
                rg:'',
                telefone:'',
                info:''
            },
                setTimeout(this.back_home, 600);
        }
    }

})