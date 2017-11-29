var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newFornecedor:{
            id:'',
            nome:'',
            endereco:'',
            cpfCnpj:'',
            rgIe:'',
            telefone:'',
            contato:'',
            info:'',
            email:''
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
        fornecedores:[]
    },
    created:function(){
        this.findAll();
        this.valida_update();
       // this.findAllEnderecos();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/fornecedor/todos")
                .then(function (res) {
                    console.log(res.body);
                    this.fornecedores = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
        },
        /*findAllEnderecos:function() {
            this.$http.get("http://localhost:8080/endereco/todos")
                .then(function(res){
                    console.log(res.body);
                    this.fornecedores = res.body;
                }, function (res){
                    console.log(res);
                });
        },*/
        updateFornecedor: function () {
            this.$http.put("http://localhost:8080/fornecedor/alterar", this.newFornecedor)
                .then(function(res) {
                    window.alert("Fornecedor Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newFornecedor.id==""){
                this.add();
            }else {
                this.updateFornecedor();
            }
            this.clear();
        },
        add: function () {
            console.log(this.newEndereco);
            this.newFornecedor.endereco = this.newEndereco;
            this.$http.post("http://localhost:8080/fornecedor/salvar", this.newFornecedor)
                .then(function(res) {
                    window.alert("Fornecedor Adicionado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/fornecedor-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteFornecedor: function (i) {
            this.$http.delete("http://localhost:8080/fornecedor/" + (i))
                .then(function (res) {
                    window.alert("Fornecedor Deletado");
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
            console.log("prepare update");
            console.log(c);
            open_file('fornecedor.html');
        },
        valida_update: function () {
        if (update_global != '') {
            var aux_update = JSON.parse(update_global);
            //Não esta funcionando
            this.newFornecedor = aux_update;
            this.newEndereco = aux_update.endereco;
            update_global = ''; // LIMPANDO VARIÁVEL GLOBAL DE ATUALIZAÇÃO
        }
        },
        clear: function () {
            this.newFornecedor = {
                id:'',
                nome:'',
                endereco:'',
                cpfCnpj:'',
                rgIe:'',
                telefone:'',
                contato:'',
                info:'',
                email:''
            }
            ,this.newEndereco = {
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
                console.log(cpf.length);
                console.log(mask);
                $('#cpf').mask(mask, options);
            }
        };

        $('#cpf').mask('000.000.000-00', options);

        var options1 =  {
            onKeyPress: function(cel, e, field, options1) {
                var masks = ['(00) 00000-0000','(00) 0000-00009'];
                var mask = (cel.length>14) ? masks[0] : masks[1];
                console.log(cel.length);
                console.log(mask);
                $('#cel').mask(mask, options1);
            }
        };

        $('#cel').mask('(00) 0000-0000', options1);

        $('#num').mask('0000000000');

        $('#cep').mask('00000-000');
        $('#estado').mask('AA');

    }

})