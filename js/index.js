// var page_data_controller = new Vue({
//     el:'#page_data_controller',
//     data:{
//         form_vars:{
//             menu_ativo	    : ''
//         }
//     },
//
//     methods: {
//         open_file: function (file_name) {
//             $.ajax({url: "/html/"+file_name, cache: false, async: false, success: function(result){
//                 $('.page_data_content').html(result);
//             }});
//         },
//     },
//     created: function () {
//         //this.search_menu('index');
//     }
// });
var update_global = '';
var dias = '';
var dataIni='';
var dataFin='';
var datasPeriodo=[];
var datasValor='';
var graficoSetado = false;
var myChartB ='';
var myChartL = '';
var coresFundo = [];
var coresBorda =[];
var usuarioLogado ='';

/*function open_file(file_name){
    $.ajax({url: "/html/"+file_name, cache: false, async: false, success: function(result){
        $('.page_data_content').html(result);
        $('#navbarResponsive').removeClass('show');
        $('#toTop').click();
    }});
}*/
var now = new Date();
function open_file(file_name){
    var agora = now.getTime();
    var tempo_permitido =  window.sessionStorage.getItem('tempo_sessao');
    tempo_permitido = parseInt(tempo_permitido) + parseInt(300000);
    //console.log('Tempo permitido: '+tempo_permitido+' || Agora: '+agora);
    if( tempo_permitido >= agora ){
        window.sessionStorage.setItem('tempo_sessao', agora);
        //console.log('novo local storage: '+sessionStorage.getItem('tempo_sessao'));
        $.ajax({url: "/html/"+file_name, cache: false, async: false, success: function(result){
            $('.page_data_content').html(result);
            $('#navbarResponsive').removeClass('show');
        }});
    }else{
        window.location = "../login.html";
    }
}

open_file('home.html');


