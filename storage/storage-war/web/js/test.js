$(document).ready(function () {
    var path = "http://localhost:8080/storage-war/api/auth";
    //добавление товара 
    function createGood() {
        
        sessionStorage.token = "123123123"
        $.ajax({
            data: JSON.stringify({
                'log':'123',
                'car':'321'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token' : 'token'
            },
            'type': 'POST',
            'url': path,
            'dataType': 'json',
            'success': function(data) {
                console.log('true');
            }
        });
    }
    
    createGood();
})