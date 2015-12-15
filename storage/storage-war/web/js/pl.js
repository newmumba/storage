$(document).ready(function () {
    var pathPackinglists = "http://localhost:8080/storage-war/api/pl";
    var pathCars = "http://localhost:8080/storage-war/api/cars";
    
    $('.button-add-pl').click(function(){
        var packinglistId = $(this).attr("button-packinglist-id");
        var carId = $('.select-cars').val();
        if (packinglistId !== "" && carId !== "")
            appointCarInPL(packinglistId, carId);
        $('.button-default-add').click();
    });
    
    $(".button-return-car").click(function() {
        var carId = $(this).attr("button-car-id");
        if (carId !== "")
            returnCar(carId);
        $('.button-default-return').click();
    })
    
    function getPackinglistsAll() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'GET',
            'url': pathPackinglists + '/accepted',
            'dataType': 'json',
            'success': function(data) {
                if (data) {
                    data.packinglists = !(data.packinglists instanceof Array) ? [data.packinglists] : data.packinglists;
                    var arr = data.packinglists.map(function(packinglists) {
                        return packinglists;
                    });
                    renderPackinglists(arr);
                } else {
                    $('.packinglists-all').html("<p>Нет накладных</p>");
                }
            }
        });
    }
    
    function getCars() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'url': pathCars,
            'type': 'GET',
            'dataType': 'json',
            'success': function(data) {
                if (data)
                {
                    data.cars = !(data.cars instanceof Array) ? [data.cars] : data.cars;
                    var arr = data.cars.map(function(car) {
                        return car;
                    });
                    renderCarsFree(arr);
                    renderCarsAll(arr);
                } else {
                }
            }
        });
    }
    
    function returnCar(carId){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'url': pathCars + '/return',
            'type': 'POST',
            'data': carId,
            'dataType': 'json',
            'success': function(data) {
                getPackinglistsAll();
                getCars();
            }
        });
    }
    
    function appointCarInPL(packinglistId, carId) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'url': pathPackinglists + '/appoint/' + packinglistId,
            'type': 'POST',
            'data': carId,
            'dataType': 'json',
            'success': function(data) {
                if (data) {
                    data.packinglists = !(data.packinglists instanceof Array) ? [data.packinglists] : data.packinglists;
                    var arr = data.packinglists.map(function(packinglists) {
                        return packinglists;
                    });
                    renderPackinglists(arr);
                } else {
                    $('.packinglists-all').html("<p>Нет накладных</p>");
                }
            }
        });
    }
    
    function renderPackinglists(arr) {
        var html = '';
        arr.forEach(function(en) {
            var packinglistString = getHtmlPackinglistString(en);
            var htmlOrderButton = '<tr class="packinglist-string" packinglist-id="' + en.id + '">' + packinglistString +
                    '<td><span class="glyphicon glyphicon-ok button-cars" data-toggle="modal" data-target="#modal-cars"></span></td</tr>';

            if (en.orders) {
                en.orders = !(en.orders instanceof Array) ? [en.orders] : en.orders;
                var arr = en.orders.map(function(orders) {
                    return orders;
                });
                htmlOrderInPL = renderOrderInPL(arr);
            } else {
                htmlOrderInPL = '<p>Нет заявок в накладной</p>'
            }
            html = '<div class="panel panel-default panel-packinglist-' + en.id + '"><div class="panel-heading"><div class ="row">' +
                    '<div><table class="table table-condensed">' + htmlOrderButton + '</table></div>' +
                    '<a data-toggle="collapse" data-parent="#delivery" href="#collapse' + en.id + '">' +
                    '<div class ="row button-open-packinglist"><div class="col-xs-12"></div></div></a></div></div>' +
                    '<div id="collapse' + en.id + '" packinglist-id = "' + en.id + '" class="panel-collapse collapse"><div class="panel-body"><div class="table-goods-in-order">' +
                    htmlOrderInPL +
                    '</div></div></div></div>' + html;
        });
        $('.packinglists-all').html(html);
        addPackinglistsClick();
    }
    
    function renderOrderInPL(arr) {
        var html = '';
        var orderString = '';
        arr.forEach(function(en) {
            orderString = '<tr><td>' + ((en.id) ? en.id : '') +
                    '</td><td class = "order-state" order-state="' + en.state + '">' + (en.state == 1 ? 'На рассмотрении' : (en.state == 2 ? 'Принята' : (en.state == 3 ? 'Доставка' : (en.state == 4 ? 'Закрыта': 'Открыта')))) +
                    '</td><td>' + ((new Date(en.date)).toLocaleDateString()) +
                    '</td><td class = "order-address">' + ((en.address) ? en.address : '') +
                    '</td><td class="order-amount">' + ((en.amount) ? en.amount : '') +
                    '</td><td  class="order-size">' + ((en.size) ? en.size : '') + '</td></tr>' + orderString;
        });
        html = '<table class="table table-condensed"><thead><tr><th>№ заявки</th><th>Статус</th><th>Дата</th><th>Адрес</th><th>Сумма</th><th>Размер</th></tr></thead><tbody>' + orderString +
                '</tbody></table>';
        return html;
    }
    
    function renderCarsFree(arr) {
        var html = '';
        arr.forEach(function(en) {
            if(en.state == "true")
                html = html + '<option value="' + en.id + '">' + en.name + ' (' + en.carSize + ')</option>';
        });
        $('.select-cars').html(html);
    }
    
    //вывод всех машин.
    function renderCarsAll(arr) {
        var html = '';
        arr.forEach(function(en) {
            var carString = getHtmlCarString(en);
            html = '<tr class="car-string" car-id="' + en.id + '">' + carString +
                    '<td><span class="glyphicon glyphicon-arrow-left button-return" data-toggle="modal" data-target="#modal-return-car"></span></td>' + html;
        });
        html = '<table class="table table-condense"><thead><tr><th>Название</th><th>Размер</th><th>Состояние</th><th></th></tr></thead><tbody>' + html + '</tbody></table>';
        $('.cars-all').html(html);
        //Добавляем обработчик нажатий
        addClick();
    }
    
    function getHtmlPackinglistString(en) {
        var htmlDistrict = '';
        if (en.idDistrict === undefined) {
            htmlDistrict = '</td><td class = "packinglist-district-id" district-id = "">';
        } else {
            htmlDistrict = '</td><td class = "packinglist-district-id" district-id = "' + en.idDistrict.id + '">' + en.idDistrict.district;
        }
        var html = '<td>' + ((en.id) ? en.id : '') +
                '</td><td class = "packinglist-state" packinglist-state="' + en.state + '">' + (en.state == 1 ? 'Сформирована' : (en.state == 2 ? 'Доставка' : (en.state == 3 ? 'Закрыта' : 'Открыта'))) +
                '</td><td>' + ((new Date(en.firsdate)).toLocaleDateString()) +
                '<td>' + ((en.idCar) ? ((en.idCar)? en.idCar.name: '') : '') + '</td>' +
                '</td>' + htmlDistrict +
                '</td><td  class="packinglist-size">' + ((en.plSize) ? en.plSize : '') + '</td>';
        return html;
    }
    
    //делаем строку машины в таблице.
    function getHtmlCarString(en) {
        var html = '<td class = "car-name">' + en.name + '</td><td class = "car-size">' + en.carSize + '</td><td class = "car-state">' + (en.state == 'true' ? 'Свободна' : 'Занята') + '</td>';
        return html;
    }
    
    function addPackinglistsClick() {
        $('.button-cars').click(function() {
            
            packinglistId = $(this).parents("tr").attr('packinglist-id');
            $(".button-add-pl").attr("button-packinglist-id", packinglistId);
        });
    }
    
    function addClick(){
        $('.button-return').click(function() {
            carId = $(this).parents("tr").attr('car-id');
            $(".button-return-car").attr("button-car-id", carId);
        });
    }
    
    getPackinglistsAll();
    getCars();
});