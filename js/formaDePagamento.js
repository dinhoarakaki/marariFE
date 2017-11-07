var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newFormaPagamento:{
            id:'',
            descricao:''
        },
        formasPagamento:[]
    },
    mounted:function(){
        this.findAll();
        this.valida_update();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/formapagamento/todos")
                .then(function (res) {
                    this.formasPagamento = res.body;
                }, function (res) {
                    console.log(res);
                });
            setTimeout(function() { $("#dataTable").DataTable(); }, 600);
        },
        updateFormaPagamento: function () {
            this.$http.put("http://localhost:8080/formapagamento/alterar", this.newFormaPagamento)
                .then(function(res) {
                    window.alert("Forma de Pagamento Editada");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newFormaPagamento.id==""){
                this.add();
            }else {
                this.updateFormaPagamento();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/formapagamento/salvar", this.newFormaPagamento)
                .then(function(res) {
                    window.alert("Forma de Pagamento Salva");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        back_home: function () {
            $.ajax({
                url: "/html/formaDePagamento-list.html", success: function (result) {
                    $('.page_data_content').html(result);
                }
            });
        },
        deleteFormaPagamento: function (i) {
            this.$http.delete("http://localhost:8080/formapagamento/" + (i))
                .then(function (res) {
                    window.alert("Forma de Pagamento Deletada");
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
            open_file('formaDePagamento.html');
        },
        valida_update: function () {
            if (update_global != '') {
                var aux_update = JSON.parse(update_global);
                //Não esta funcionando
                this.newFormaPagamento = aux_update;
                update_global = ''; // LIMPANDO VARIÁVEL GLOBAL DE ATUALIZAÇÃO
            }
        },
        clear: function () {
            this.newFormaPagamento = {
                id:'',
                nome:'',
                telefone:'',
                endereco:'',
                regiao:''
            },
                setTimeout(this.back_home, 600);
        }
    }

})