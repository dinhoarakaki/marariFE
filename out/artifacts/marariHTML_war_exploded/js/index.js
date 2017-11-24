var page_data_controller = new Vue({
    el:'#page_data_controller',
    data:{
        form_vars:{
            menu_ativo	    : ''
        }
    },

    methods: {
        open_file: function (file_name) {
            $.ajax({url: "/html/"+file_name, success: function(result){
                $('.page_data_content').html(result);
            }});
        },
    },
    created: function () {
        //this.search_menu('index');
    }
});
