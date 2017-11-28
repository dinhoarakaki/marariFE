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
        teste1: function (start,end) {
            console.log(start +" asdasdasd"+ end);
        },
        relatCaixa: function () {
            this.$http.get("http://localhost:8080/relatorio/movimentocaixa?dataIni="+this.listaCaixa.dataIni+"&dataFin="+this.listaCaixa)
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