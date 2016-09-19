$( document ).ready(function() {

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