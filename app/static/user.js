$( document ).ready(function() {
    $('#login').click(function(){
        $('#session')[0].href = '/logout'
        $('#session')[0].text = 'logout'
    });

    $('#logout').click(function(){
        $('#session')[0].href = '/login'
        $('#session')[0].text = 'login'
    });

    $('#download').click(function(){
        $.ajax({
            dataType: 'json',
            method: 'GET',
            url: '/data',
            success: function (response) {
                debugger
                //tranformar para csv e implementar download js
                
            }
        });
    });

});