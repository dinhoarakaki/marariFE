var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newVendedor:{
            id:'',
            nome:'',
            email:'',
            endereco:'',
            cpfCnpj:'',
            rg:'',
            regiao:'',
            meta:'',
            telefone:'',

        },

        vendedores:[]
    },
    created:function(){
        this.findAll();
        this.valida_update();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/vendedor/todos")
                .then(function (res) {
                    this.vendedores = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
        },
        findParametro:function () {
            this.$http.get("http://localhost:8080/vendedor/parametro?parametro=gf")
                .then(function (res) {
                    console.log("parametro");
                    console.log(res.body);
                }, function (res) {
                    console.log(res);
                });
        },
        updateVendedor: function () {
            this.$http.put("http://localhost:8080/vendedor/alterar", this.newVendedor)
                .then(function(res) {
                    window.alert("Vendedor Editado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newVendedor.id==""){
                this.add();
            }else {
                this.updateVendedor();
            }
            this.clear();
        },
        add: function () {
            console.log(this.newVendedor);
            this.$http.post("http://localhost:8080/vendedor/salvar", this.newVendedor)
                .then(function(res) {
                    window.alert("Vendedor Adicionado");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/vendedor-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteVendedor: function (i) {
            this.$http.delete("http://localhost:8080/vendedor/" + (i))
                .then(function (res) {
                    window.alert("Vendedor Deletado");
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
            open_file('vendedor.html');
        },valida_update: function () {
            if (update_global != '') {
                var aux_update = JSON.parse(update_global);
                //Não esta funcionando
                this.newVendedor = aux_update;
                update_global = ''; // LIMPANDO VARIÁVEL GLOBAL DE ATUALIZAÇÃO
            }
        },
        clear: function () {
            this.newVendedor = {
                id:'',
                nome:'',
                email:'',
                endereco:'',
                cpfCnpj:'',
                rg:'',
                regiao:'',
                meta:'',
                telefone:'',

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

        $('#meta').mask('000.000.000.000.000,00', {reverse: true});
        $('#rg').mask('000.000.000');
        $('#estado').mask('AA');
        $('#cep').mask('00000-000');
        $('#num').mask('0000000000');
    }

})