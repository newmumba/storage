$(document).ready(function () {
    var path = "http://localhost:8080/storage-war/api/cars";
    
    //Кнопка "Добавить"
    $('.button-add-car').click(function() {
        var buttonContext = $('.button-add-car').attr('button-context');
        if (buttonContext === 'add') {
            createCar();
        } else if (buttonContext === 'change') {
            changeCar();
        } else {
            $('.button-default-add').click();
        }
    });
    
    //button delete
    $('.button-delete-car').click(function() {
        var carId = $(this).attr("button-car-id");
        if (carId !== "")
            delCar(carId);
    });
    
    $('.button-add').click(function() {
        $('#name').val("");
        $('#carSize').val("");
        $('#carModalLabel').html("Добавление машину");
        $('.button-add-car').html("Добавить");
        $('.button-add-car').attr("button-context", "add");
        $('.button-add-car').attr("car-id", "");
    });
    
    //получение всех товаров
    function getCarsAll(){
        $.ajax({
            headers:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
            },
            'url': path,
            'type': 'GET',
            'dataType': 'json',
            'success' :function(data){               
                if(data)
                {   
                    data.cars = !(data.cars instanceof Array) ? [data.cars] : data.cars;
                    var arr = data.cars.map(function(car) {
                        return car;
                    });
                    renderCarsAll(arr);
                }else{
                    var html = '<p>Ни одного товара не добавлено!<p>';
                    $('.cars-all').html(html);
                }
            }
        });
    }
    
    //добавление товара 
    function createCar() {
        var newCar = {
            'name': $('#name').val(),
            'carSize': $('#carSize').val()
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': path,
            'data': JSON.stringify(newCar),
            'dataType': 'json',
            'success': function() {
                $('.button-default-add').click();
                getCarsAll();
                $('#name').val("");
                $('#carSize').val("");
            }
        });
    }
    
    //change car
    function changeCar() {
        var id = $('.button-add-car').attr('car-id');
        var newCar = {
            'name': $('#name').val(),
            'carSize': $('#carSize').val()
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': path + '/update/' + id,
            'data': JSON.stringify(newCar),
            'dataType': 'json',
            'success': function(data) {
                $('.button-default-add').click();
                $('#name').val("");
                $('#carSize').val("");

                //получаем новую строку товара
                var html = getHtmlCarString(data);
                //удаляем инфу о товаре
                $('tr[car-id=' + id + ']').children("td:lt(4)").remove();
                //заменяем строку товара на новую
                $('tr[car-id=' + id + ']').prepend(html);
            }
        });
    }
    
    //delete car
    function delCar(carId) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'DELETE',
            'url': path,
            'data': carId,
            'dataType': 'json',
            'success': function(data) {
                //удаляем инфу о товаре
                $('tr[car-id=' + carId + ']').remove();
                //закрываем модальное окно
                $('.button-default-delete').click();
            }
        });
    }
    
    //делаем строку товара в таблице.
    function getHtmlCarString(en){
        var html = '<td class = "car-name">' + en.name + '</td><td class = "car-size">' + en.carSize + '</td><td class = "car-state">' + (en.state == 'true' ?'Свободна': 'Занята') + '</td><td class = "car-date">' + ((new Date(en.date)).toLocaleString()) + '</td>';
        return html;
    }
    
    //вывод всех товаров.
    function renderCarsAll(arr) {
        var html = '';
        arr.forEach(function(en) {
            var carString = getHtmlCarString(en);
            html = '<tr class="car-string" car-id="' + en.id + '">' + carString +
                    '<td><span class="glyphicon glyphicon-pencil button-change" data-toggle="modal" data-target="#modal-car"></span></td>' +
                    '<td><span class="glyphicon glyphicon-trash button-delete" data-toggle="modal" data-target="#small-modal-car"></span></td></tr>' + html;
        });
        html = '<table class="table table-condense"><thead><tr><th>Название</th><th>Размер</th><th>Состояние</th><th>Дата</th><th></th><th></th></tr></thead><tbody>' + html + '</tbody></table>';
        $('.cars-all').html(html);
        //Добавляем обработчик нажатий
        addClick();
    }
    
    //кликер
    function addClick(){
        $('.button-delete').click(function() {
            carId = $(this).parents("tr").attr('car-id');
            $(".button-delete-car").attr("button-car-id", carId);
        });   
        
        //button change
        $('.button-change').click(function() {
            carId = $(this).parents("tr").attr('car-id');
            $('#name').val($(this).parents("tr").children(".car-name").html());
            $('#carSize').val($(this).parents("tr").children(".car-size").html());
            $('#carModalLabel').html("Изменение машины");
            $('.button-add-car').html("Изменить");
            $('.button-add-car').attr("button-context", "change");
            $('.button-add-car').attr("car-id", carId);
        });
    }
    
   //выводим все машины
    getCarsAll();
});