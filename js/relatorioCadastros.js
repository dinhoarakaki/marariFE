var app = new Vue({
    el: '#app',
    data: {
        indexUpdate: -1,
        isActive: false,
        listaCliente: {
            nome: '',
            nomeVendedor: ''
        },
        listaPosicao: {
            nome: ''
        },
        listaFornecedor: {
            nome: ''
        },
        clientes: [],
        vendedores: [],
        fornecedores: [],
        produtos: []
    },
    created: function () {
        this.findAllClientes();
        this.findAllVendedores();
        this.findAllProdutos();
        this.findAllFornecedores();
    },
    methods: {
        clear: function () {
            this.listaCliente = {
                nome: '',
                nomeVendedor: ''
            },
            this.listaPosicao = {
                nome: ''
            },
            this.listaFornecedor = {
                nome: ''
            }
        },
        findAllVendedores: function () {
            this.$http.get("http://localhost:8080/vendedor/todos")
                .then(function (res) {
                    this.vendedores = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllFornecedores: function () {
            this.$http.get("http://localhost:8080/fornecedor/todos")
                .then(function (res) {
                    this.fornecedores = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllClientes: function () {
            this.$http.get("http://localhost:8080/cliente/todos")
                .then(function (res) {
                    this.clientes = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllProdutos: function () {
            this.$http.get("http://localhost:8080/produto/todos")
                .then(function (res) {
                    this.produtos = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        relatCliente: function () {
            this.$http.get("http://localhost:8080/relatorio/listacliente?nome="+this.listaCliente.nome+"&nomeVendedor="+this.listaCliente.nomeVendedor)
                .then(function (res) {
                    var newWindow = window.open();
                    newWindow.document.write(res.body);
                }, function (res) {
                    window.alert(res.body.mensagem);
                });
            this.clear();
        },
        relatPosicao: function () {
            console.log(this.listaPosicao.nome)
            this.$http.get("http://localhost:8080/relatorio/posicaoestoque?nome="+this.listaPosicao.nome)
                .then(function (res) {
                    var newWindow = window.open();
                    newWindow.document.write(res.body);
                }, function (res) {
                    window.alert(res.body.mensagem);
                });
            this.clear();
        },
        relatFornecedor: function () {
            this.$http.get("http://localhost:8080/relatorio/listafornecedor?nome="+this.listaFornecedor.nome)
                .then(function (res) {
                    var newWindow = window.open();
                    newWindow.document.write(res.body);
                }, function (res) {
                    window.alert(res.body.mensagem);
                });
            this.clear();
        }
    }
})