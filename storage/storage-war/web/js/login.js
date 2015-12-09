$(document).ready(function () {
    var path = "http://localhost:8080/storage-war/api/auth";
    
    $('.button-auth').click(function (){
        var authData = {
            'login': $('#login').val(),
            'password': $('#password').val()
        };
        if(authData.login != '' && authData.password !=''){
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                'type': 'POST',
                'url': path,
                'data': JSON.stringify(authData),
                'dataType': 'json',
                'success': function(data) {
                    console.log(123);
                }
            });
       }
    });
})