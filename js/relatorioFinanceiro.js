var app = new Vue({
    el: '#app',
    data: {
        listaCaixa: {
            dataIni: '',
            dataFin: ''
        }
    },
    methods: {
        clear: function () {
            this.listaCliente = {
                dataIni: '',
                dataFin: ''
            }
        },
        relatCaixa: function () {
            this.$http.post("http://localhost:8080/relatorio/movimentocaixa", this.listaCliente)
                .then(function (res) {
                    window.alert("Funcionou - Clientes");
                    this.findAll();
                }, function (res) {
                    window.alert(res.body.mensagem);
                });
            clear();
        }
    }
})