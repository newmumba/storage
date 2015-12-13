$(document).ready(function () {
    var pathCustomers = "http://localhost:8080/storage-war/api/user";
    var pathOrders = "http://localhost:8080/storage-war/api/orders";
    var pathDistricts = "http://localhost:8080/storage-war/api/districts";
    var pathGoods = "http://localhost:8080/storage-war/api/goods";
    var pathGP = "http://localhost:8080/storage-war/api/gp";
    var customerId = getUserId();

    function getUserId() {
        var params = location.search.substring(1).split("&");
        var GET = {};
        for (var i = 0; i < params.length; i++) {
            var getVar = params[i].split("=");
            if (getVar[0] === "id"){
                return getVar[1];
            }
        }
        return '';
    }
  
    //Кнопка "Добавить" заявку
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
    
    //Кнопка "Добавить" товар
    $('.button-add-good').click(function() {
        var buttonContext = $('.button-add-good').attr('button-context');
        if (buttonContext === 'add') {
            createGoodInOrder();
            $('.button-default-add').click();
        } else if (buttonContext === 'change') {
            changeGoodInOrder();
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
    
    $('.button-delete-order-yes').click(function() {
        var orderId = $(this).attr("button-order-id");
        if (orderId !== "")
            delOrder(orderId);
    });
    
    
    $('.button-delete-good-yes').click(function(){
        var goodspositionId = $(this).attr("button-goodsposition-id");
        var orderId = $(this).attr('button-gp-order-id')
        if (goodspositionId !== "")
            delGoodsInOrder(goodspositionId, orderId);
    });
    
    function getCustomerById(customerId) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'GET',
            'url': pathCustomers + '/' + customerId,
            'data': customerId,
            'dataType': 'json',
            'success': function(data) {
                if(data){
                    renderCustomer(data);
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
            'url': pathOrders + '/add/' + customerId,
            'data': JSON.stringify(newOrder),
            'dataType': 'json',
            'success': function(data) {
            }
        });
    }
    
    function createGoodInOrder() {
        var newGoodInOrder = {
            'orderId': $('.button-add-good').attr('order-id'),
            'goodId': $('.select-goods').val(),
            'customerId': customerId,
            'count' : $('#good-count').val()
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': pathGP,
            'data': JSON.stringify(newGoodInOrder),
            'dataType': 'json',
            'success': function(data) {
                goodspositionUpdate(data);
            }
        });
    }
    
    function goodspositionUpdate(data){
        if (data) {
            if (data.goodspositions && data.id) {
                var divId = '#collapse' + data.id;
                data.goodspositions = !(data.goodspositions instanceof Array) ? [data.goodspositions] : data.goodspositions;
                var arr = data.goodspositions.map(function(goodsposition) {
                    return goodsposition;
                });
                $(divId).find('.table-goods-in-order').html(renderGoodsInOrder(arr));
                
                $(divId).find('.table-goods-in-order').find('.button-delete-good-in-order').click(function() {
                    goodspositionId = $(this).parents('tr').attr('goodsposition-id');
                    orderId = $(this).closest('.panel-collapse').attr('order-id');
                    $('.button-delete-good-yes').attr('button-goodsposition-id', goodspositionId);
                    $('.button-delete-good-yes').attr('button-gp-order-id', orderId);

                });
                
                $(divId).find('.table-goods-in-order').find('.button-plus').click(function() {
                    var goodspositionId = $(this).parents("tr").attr('goodsposition-id');
                    orderId = $(this).closest('.panel-collapse').attr('order-id');
                    incGoodsposition(goodspositionId, orderId, this);
                });

                $(divId).find('.table-goods-in-order').find('.button-minus').click(function() {
                    var goodspositionId = $(this).parents("tr").attr('goodsposition-id');
                    orderId = $(this).closest('.panel-collapse').attr('order-id');
                    decGoodsposition(goodspositionId, orderId, this);
                });
            }
            (data.size) ? $('tr[order-id=' + data.id + ']').find('.order-size').html(data.size) : '';
            (data.amount) ? $('tr[order-id=' + data.id + ']').find('.order-amount').html(data.amount) : '';
        }
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
                $('.button-default-add').click();
                $('#order-address').val("");

                //получаем новую строку заявки
                var html = getHtmlOrderString(data);
                //удаляем инфу о заявке
                $('tr[order-id=' + orderId + ']').children("td:lt(7)").remove();
                //заменяем строку заявки на новую
                $('tr[order-id=' + orderId + ']').prepend(html);
            }
        });
    }
    
    //плюс
    function incGoodsposition(goodspositionId, orderId, ctx) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': pathGP + "/inc/" + orderId,
            'data': goodspositionId,
            'dataType': 'json',
            'success': function(data) {
                goodspositionUpdate(data);
            }
        });
    }

    //минус
    function decGoodsposition(goodspositionId, orderId, ctx) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': pathGP + "/dec/" + orderId,
            'data': goodspositionId,
            'dataType': 'json',
            'success': function(data) {
                goodspositionUpdate(data);
            }
        });
    }
    
    //delete order
    function delOrder(orderId) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'DELETE',
            'url': pathOrders,
            'data': orderId,
            'dataType': 'json',
            'success': function(data) {
                //удаляем инфу о заявке
                var divOrder = '.panel-order-' + orderId;
                $(divOrder).remove();
                //закрываем модальное окно
                $('.button-default-delete').click();
            }
        });
    }
    
    //delete Goods In Order
    function delGoodsInOrder(goodspositionId, orderId){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'DELETE',
            'url': pathGP + '/' + orderId,
            'data': goodspositionId,
            'dataType': 'json',
            'success': function(data) {
                //удаляем инфу о товаре
                $('tr[goodsposition-id=' + goodspositionId + ']').remove();
                //закрываем модальное окно
                (data.size) ? $('tr[order-id=' + data.id + ']').find('.order-size').html(data.size) : '';
                (data.amount) ? $('tr[order-id=' + data.id + ']').find('.order-amount').html(data.amount) : '';
                $('.button-default-delete').click();
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
                    '<td><span class="glyphicon glyphicon-trash button-delete-order" data-toggle="modal" data-target="#modal-delete-order"></span></td</tr>';
                    //(en.goodspositions ? '<tr><td colspan="2"></td><td colspan="2">' + en.goodspositions.id + '</td><td colspan="2">' + en.goodspositions.count + '</td><td colspan="2">' + en.goodspositions.idGoods.name + '</td><td colspan="1">' + en.goodspositions.idGoods.goodSize + '</td></tr>':'');
            
           if(en.goodspositions){
                en.goodspositions = !(en.goodspositions instanceof Array) ? [en.goodspositions] : en.goodspositions;
                var arr = en.goodspositions.map(function(goodsposition) {
                    return goodsposition;
                });
                htmlGoodsInOrder  = renderGoodsInOrder(arr);
           }else{
               htmlGoodsInOrder = '<p>Нет товаров в заявке</p>'
           }
            html = '<div class="panel panel-default panel-order-' + en.id + '"><div class="panel-heading"><div class ="row">' +
                    '<div><table class="table table-condensed">' + htmlOrderButton + '</table></div>' +
                    '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + en.id + '">' +
                    '<div class ="row button-open-order"><div class="col-xs-12"></div></div></a></div></div>' +
                    '<div id="collapse' + en.id + '" order-id = "' + en.id + '" class="panel-collapse collapse"><div class="panel-body"><div class="table-goods-in-order">' +
                    htmlGoodsInOrder + 
                    '</div><button order-id="' + en.id + '" class="btn btn-primary button-good" data-toggle="modal" data-target="#modal-good">Добавить</button></div></div></div>' + html; 
        });
        $('.orders-all').html(html);
        addClick();
    }
    
    function renderGoodsInOrder(arr) {
        var html = '';
        var goodString = '';
        arr.forEach(function(en) {
            goodString = '<tr goodsposition-id="' + en.id + '"><td>' + ((en.idGoods) ? ((en.idGoods.name) ? en.idGoods.name : '') : '') + 
                    '</td><td>' + ((en.count) ? en.count : '') + 
                    '</td><td>' + ((en.idGoods) ? ((en.idGoods.goodSize) ? en.idGoods.goodSize :'') : '') + 
                    '</td><td>' + ((en.idGoods) ? ((en.idGoods.price) ? en.idGoods.price :'') : '') + 
                    '</td><td>' + ((en.idGoods && en.count) ? ((en.idGoods.price && en.count) ? (en.idGoods.price * en.count) : '') : '')  + '</td>'+
                    '<td><span class="glyphicon glyphicon-plus button-plus"></span></td>' +
                    '<td><span class="glyphicon glyphicon-minus button-minus"></span></td>' +
                    '<td><span class="glyphicon glyphicon-trash button-delete-good-in-order" data-toggle="modal" data-target="#modal-delete-good-in-order"></span></td</tr>'+
                    '</tr>' + goodString;
        });
        html = '<table class="table table-condensed"><thead><tr><th>Товар</th><th>Кол-во</th><th>Размер</th><th>Цена</th><th>Сумма</th><th></th><th></th><th></th></tr></thead><tbody>' + goodString + 
                '</tbody></table>';
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
                '</td><td class="order-amount">' + ((en.amount) ? en.amount : '') + 
                '</td><td  class="order-size">' + ((en.size) ? en.size : '') + '</td>';
        return html;
    }
    
    function renderDistricts(arr){
        var html = '';
        arr.forEach(function(en) {
            html =  html + '<option value="' + en.id + '">' + en.district + '</option>';
        });
        $('.select-district').html(html);
    }
    
    function renderGoods(arr){
        var html = '';
        arr.forEach(function(en) {
            html = html + '<option value="' + en.id + '">' + en.name + ' <i class="test">(' + en.price + ' руб.)</i></option>';
        });
        $('.select-goods').html(html);
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
    
    function getGoods(){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'GET',
            'url': pathGoods,
            'dataType': 'json',
            'success': function(data) {
                if (data) {
                    data.goods = !(data.goods instanceof Array) ? [data.goods] : data.goods;
                    var arr = data.goods.map(function(good) {
                        return good;
                    });
                    renderGoods(arr);
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
        
        $('.button-good').click(function() {
            var headerForm = "Добавление товара в заявку № " + $(this).attr("order-id");
            $('#goodModalLabel').html(headerForm);
            $('.button-add-good').html("Добавить");
            $('.button-add-good').attr("button-context", "add");
            $('.button-add-good').attr("order-id", $(this).attr("order-id"));
            $('#good-count').val("1");
        });
        
        $('.button-delete-order').click(function() {
            orderId = $(this).parents("tr").attr('order-id');
            $(".button-delete-order-yes").attr("button-order-id", orderId);
        });
        
        $('.button-delete-good-in-order').click(function(){
            goodspositionId = $(this).parents('tr').attr('goodsposition-id');
            orderId = $(this).closest('.panel-collapse').attr('order-id');
            $('.button-delete-good-yes').attr('button-goodsposition-id', goodspositionId);
            $('.button-delete-good-yes').attr('button-gp-order-id', orderId);
            
        });
        
        $('.button-plus').click(function() {
            var goodspositionId = $(this).parents("tr").attr('goodsposition-id');
            orderId = $(this).closest('.panel-collapse').attr('order-id');
            incGoodsposition(goodspositionId, orderId, this);
        });

        $('.button-minus').click(function() {
            var goodspositionId = $(this).parents("tr").attr('goodsposition-id');
            orderId = $(this).closest('.panel-collapse').attr('order-id');
            decGoodsposition(goodspositionId, orderId, this);
        });
    }
    
    //получаем все районы
    getDistricts();
    //получаем все товары
    getGoods();
    //получаем данные пользователя
    getCustomerById(customerId);
});