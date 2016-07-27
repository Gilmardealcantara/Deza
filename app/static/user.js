$( document ).ready(function() {
    $('#login').click(function(){
        $('#session')[0].href = '/logout'
        $('#session')[0].text = 'logout'
    });

    $('#logout').click(function(){
        $('#session')[0].href = '/login'
        $('#session')[0].text = 'login'
    });
});