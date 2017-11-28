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
            this.listaCaixa = {
                dataIni: '',
                dataFin: ''
            }
        },
        relatCaixa: function () {
            this.$http.post("http://localhost:8080/relatorio/movimentocaixa?dataIni="+this.listaCaixa.dataIni+"&dataFin="+this.listaCaixa)
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