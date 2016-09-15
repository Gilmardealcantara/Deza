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
                var csv = '';
                response.json.data.forEach(function(row){
                    csv += row.join(',') + '\n';
                });

                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
                element.setAttribute('download', 'user_list.csv');

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);         
            }
        });
    });

});