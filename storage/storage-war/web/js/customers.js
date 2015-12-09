$(document).ready(function () {
    var pathCustomers = "http://localhost:8080/storage-war/api/customers";
    var pathOrders = "http://localhost:8080/storage-war/api/orders";
    var pathDistricts = "http://localhost:8080/storage-war/api/districts";
    var customerId = '1';
    
    //Кнопка "Добавить"
    $('.button-add-order').click(function() {
        var buttonContext = $('.button-add-order').attr('button-context');
        if (buttonContext === 'add') {
            createOrder();
            $('.button-default-add').click();
            getOrdersByCustomer(customerId);
        } else if (buttonContext === 'change') {
            changeOrder();
            $('.button-default-add').click();
        } else {
            $('.button-default-add').click();
        }
    });
    
    $('.button-order').click(function() {
        $('#order-address').val($('tr .customer-address').html());
        $('#orderModalLabel').html("Добавление заявки");
        $('.button-add-order').html("Добавить");
        $('.button-add-order').attr("button-context", "add");
    });
    
    function getCustomerById(customerId) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'GET',
            'url': pathCustomers,
            'data': customerId,
            'dataType': 'json',
            'success': function(data) {
                if(data){
                    renderCustomer(data.customers);
                    getOrdersByCustomer(customerId);
                }else{
                    $('.customers-all').html("<p>Пользователь не найден</p>");
                }
            }
        });
    }
    
    function createOrder(){
        var newOrder = {
            'address': $('#order-address').val(),
            'districtId': $('.select-district').val(),
            'customerId': customerId
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': pathOrders,
            'data': JSON.stringify(newOrder),
            'dataType': 'json',
            'success': function(data) {
            }
        });
    }
    
    //orders
    function getOrdersByCustomer(customerId){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'GET',
            'url': pathOrders + '/' + customerId,
            'dataType': 'json',
            'success': function(data) {
                if(data){
                    console.log(data);
                    data.orders = !(data.orders instanceof Array) ? [data.orders] : data.orders;
                    var arr = data.orders.map(function(order) {
                        return order;
                    });
                    renderOrders(arr);
                }else{
                    $('.orders-all').html("<p>Нет заявок</p>");
                }
            }
        });
    }
    
    function changeOrder() {
        var orderId = $('.button-add-order').attr('order-id');
        var changeOrder = {
            'address': $('#order-address').val(),
            'districtId': $('.select-district').val()
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': pathOrders + '/update/' + orderId,
            'data': JSON.stringify(changeOrder),
            'dataType': 'json',
            'success': function(data) {
                console.log(data);
                $('.button-default-add').click();
                $('#order-address').val("");

                //получаем новую строку товара
                var html = getHtmlOrderString(data);
                //удаляем инфу о товаре
                $('tr[order-id=' + orderId + ']').children("td:lt(7)").remove();
                //заменяем строку товара на новую
                $('tr[order-id=' + orderId + ']').prepend(html);
            }
        });
    }
    
    //print one customer
    function renderCustomer(customer) {
        var html = '';
        html = '<table class="table table-condense"><tbody>' +
                '<tr><td>Имя </td><td>' + customer.name + '</td></tr>' +
                '<tr><td>Телефон</td><td>' + customer.phone + '</td></tr>' +
                '<tr><td>Адрес</td><td class="customer-address">' + ((customer.address) ? customer.address : '')+ '</td></tr>' +
                '<tr><td cui="' + ((customer.idDistrict) ? customer.idDistrict.id : '') + '">Район</td><td>' + ((customer.idDistrict) ? customer.idDistrict.district : '') + '</td></tr>' +
                '</tbody></table>';
        $('.customers-all').html(html);
    }
    
    //ptint orders for customers
    function renderOrders(arr) {
        var html = '';
        arr.forEach(function(en) {
            var orderString = getHtmlOrderString(en);
            var htmlOrderButton = '<tr class="order-string" order-id="' + en.id + '">' + orderString +
                    '<td><span class="glyphicon glyphicon-pencil button-change-order" data-toggle="modal" data-target="#modal-order"></span></td>' + 
                    '<td><span class="glyphicon glyphicon-trash button-delete-order" data-toggle="modal" data-target=".bs-example-modal-sm"></span></td</tr>';
                    //(en.goodspositions ? '<tr><td colspan="2"></td><td colspan="2">' + en.goodspositions.id + '</td><td colspan="2">' + en.goodspositions.count + '</td><td colspan="2">' + en.goodspositions.idGoods.name + '</td><td colspan="1">' + en.goodspositions.idGoods.goodSize + '</td></tr>':'');
            
           if(en.goodspositions){
                en.goodspositions = !(en.goodspositions instanceof Array) ? [en.goodspositions] : en.goodspositions;
                var arr = en.goodspositions.map(function(goodsposition) {
                    return goodsposition;
                });
                htmlGoodsInOrder  = renderGoodsInOrder(arr);
           }else{
               htmlGoodsInOrder = 'Нет товаров в заявке'
           }
            html = '<div class="panel panel-default"><div class="panel-heading"><div class ="row">' +
                    '<div><table class="table table-condensed">' + htmlOrderButton + '</table></div>' +
                    '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + en.id + '">' +
                    '<div class ="row"><div class="col-xs-12 lolo"></div></div></a></div></div>' +
                    '<div id="collapse' + en.id + '" class="panel-collapse collapse"><div class="panel-body">' +
                    htmlGoodsInOrder +
                    '</div></div></div>' + html; 
        });
        /*html = '<table class="table table-condense"><thead><tr><th>Номер</th><th>Дата</th><th>Состояние</th><th>Район</th><th>Адрес</th><th>Сумма</th><th>Размер</th><th></th><th></th><tr></thead><tbody>' +
                html +'</tbody></table>';*/

        $('.orders-all').html(html);
        addClick();
    }
    
    function renderGoodsInOrder(arr) {
        console.log(arr);
        var html = '';
        var goodString = '';
        arr.forEach(function(en) {
            console.log(en);
            goodString = '<tr><td>' + en.id + '</td><td>' + en.count + 
                    '</td><td>' + en.idGoods.goodSize + '</td><td>' + en.idGoods.name + '</td><td>' + en.idGoods.price + '</td></tr>' + goodString;
        });
        console.log(goodString);
        html = '<table class="table table-condensed"><thead><tr><th>ID</th><th>Кол-во</th><th>Размер</th><th>Товар</th><th>Цена</th></tr></thead><tbody>' + goodString + '</tbody></table>';
        return html;
    }
    
    function getHtmlOrderString(en) {
        var htmlDistrict = '';
        if(en.idDistrict === undefined){
            htmlDistrict = '</td><td class = "order-district-id" district-id = "">';
        }else{
            htmlDistrict = '</td><td class = "order-district-id" district-id = "' + en.idDistrict.id + '">' + en.idDistrict.district;
        }
        var html ='<td>' + ((en.id) ? en.id : '') + 
                '</td><td>' + ((new Date(en.date)).toLocaleString()) + 
                '</td><td class = "order-state" order-state="' + en.state + '">' + (en.state === 1 ?'На рассмотрении': (en.state === 2 ?'Принята': (en.state === 3 ?'Доставка': 'Открыта'))) + 
                htmlDistrict + 
                '</td><td class = "order-address">' + ((en.address) ? en.address : '') + 
                '</td><td>' + ((en.amount) ? en.amount : '') + 
                '</td><td>' + ((en.size) ? en.size : '') + '</td>';
        return html;
    }
    
    function renderDistricts(arr){;
        var html = '';
        arr.forEach(function(en) {
            html =  html + '<option value="' + en.id + '">' + en.district + '</option>';
        });
        $('.select-district').html(html);
    }
    
    function getDistricts() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'GET',
            'url': pathDistricts,
            'dataType': 'json',
            'success': function(data) {
                if (data) {
                    data.districts = !(data.districts instanceof Array) ? [data.districts] : data.districts;
                    var arr = data.districts.map(function(district) {
                        return district;
                    });
                    renderDistricts(arr);
                } else {
                }
            }
        });
    }
    
    function addClick(){
        $('.button-change-order').click(function() {
            var districtId = $(this).parents("tr").children(".order-district-id").attr("district-id");
            var orderId = $(this).parents("tr").attr("order-id");
            $('#order-address').val($(this).parents("tr").children(".order-address").html());
            $('.select-district [value="' + districtId + '"]').attr("selected", "selected");
            $('#orderModalLabel').html("Изменение заявки");
            $('.button-add-order').html("Изменить");
            $('.button-add-order').attr("button-context", "change");
            $('.button-add-order').attr("order-id", orderId);
        });
    }
    
    //получаем все районы
    getDistricts();
    //получаем данные пользователя
    getCustomerById(customerId);
});