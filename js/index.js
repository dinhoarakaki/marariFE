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

function open_file(file_name){
    $.ajax({url: "/html/"+file_name, cache: false, async: false, success: function(result){
        $('.page_data_content').html(result);
        $('#navbarResponsive').removeClass('show');
    }});
}

open_file('home.html');


