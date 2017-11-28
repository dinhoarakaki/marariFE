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
            this.$http.post("http://localhost:8080/relatorio/listacliente", this.listaCliente)
                .then(function (res) {
                    window.alert("Funcionou - Clientes");
                }, function (res) {
                    window.alert(res.body.mensagem);
                });
            clear();
        },
        relatPosicao: function () {
            this.$http.post("http://localhost:8080/relatorio/posicaoestoque", this.listaPosicao)
                .then(function (res) {
                    window.alert("Funcionou - Estoque");
                }, function (res) {
                    window.alert(res.body.mensagem);
                });
            clear();
        },
        relatFornecedor: function () {
            this.$http.post("http://localhost:8080/relatorio/listafuncionarios", this.listaFornecedor)
                .then(function (res) {
                    window.alert("Funcionou - Funcionarios");
                }, function (res) {
                    window.alert(res.body.mensagem);
                });
            clear();
        }
    }
})