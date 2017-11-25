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
            info:'',
            vendedor:'',
            status:''
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
        clientes:[],
        vendedores:[]
    },
    created:function(){
        this.findAll();
        this.findAllVendedores();
        this.valida_update();
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
        findAllVendedores: function () {
            this.$http.get("http://localhost:8080/vendedor/todos")
                .then(function (res) {
                    this.vendedores = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
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
            this.newCliente.endereco = this.newEndereco;
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
                this.newEndereco = aux_update.endereco;
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
            },this.newEndereco = {
                id:'',
                estado:'',
                cidade:'',
                cep:'',
                bairro:'',
                numero:'',
                rua:''
            },
                setTimeout(this.back_home, 600);
        }
    },
    mounted: function(){
        var options =  {
            onKeyPress: function(cpf, e, field, options) {
                var masks = ['00.000.000/0000-00','000.000.000-009'];
                var mask = (cpf.length>14) ? masks[0] : masks[1];
                $('#cpf').mask(mask, options);
            }
        };

        $('#cpf').mask('000.000.000-00', options);

        var options1 =  {
            onKeyPress: function(cel, e, field, options1) {
                var masks = ['(00) 00000-0000','(00) 0000-00009'];
                var mask = (cel.length>14) ? masks[0] : masks[1];
                $('#cel').mask(mask, options1);
            }
        };

        $('#cel').mask('(00) 0000-0000', options1);

        $('#rg').mask('000.000.000');
        $('#estado').mask('AA');
        $('#cep').mask('00000-000');
        $('#num').mask('0000000000');
    }

})