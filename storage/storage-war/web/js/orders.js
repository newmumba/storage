$(document).ready(function () {
    var pathOrders = "http://localhost:8080/storage-war/api/orders";
    var pathPackinglists = "http://localhost:8080/storage-war/api/pl";
    
    $(".button-accept-order-yes").click(function(){
        var orderId = $(this).attr("button-order-id");
        if (orderId !== "")
            acceptOrder(orderId);
            getPackinglistsAll();
    })
    
    $(".button-accept-packinglist-yes").click(function() {
        var packinglistId = $(this).attr("button-packinglist-id");
        if (packinglistId !== "")
            acceptPackinglist(packinglistId);
    })
    
    //orders
    function getOrdersAll() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'GET',
            'url': pathOrders + '/sent',
            'dataType': 'json',
            'success': function(data) {
                if (data) {
                    data.orders = !(data.orders instanceof Array) ? [data.orders] : data.orders;
                    var arr = data.orders.map(function(order) {
                        return order;
                    });
                    renderOrders(arr);
                } else {
                    $('.orders-all').html("<p>Нет заявок</p>");
                }
            }
        });
    }
    
    function getPackinglistsAll(){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'GET',
            'url': pathPackinglists,
            'dataType': 'json',
            'success': function(data) {
                console.log(data);
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
    
    
    function acceptOrder(orderId){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': pathOrders + '/accept',
            'data': orderId,
            'dataType': 'json',
            'success': function(data) {
                if (data) {
                    data.orders = !(data.orders instanceof Array) ? [data.orders] : data.orders;
                    var arr = data.orders.map(function(order) {
                        return order;
                    });
                    renderOrders(arr);
                } else {
                    $('.orders-all').html("<p>Нет заявок</p>");
                }
                //закрываем модальное окно
                $('.button-default-accept').click();
            }
        });
    }
    
    function acceptPackinglist(packinglistId){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': pathPackinglists + '/accept',
            'data': packinglistId,
            'dataType': 'json',
            'success': function(data) {
                if (data) {
                    data.packinglists = !(data.packinglists instanceof Array) ? [data.packinglists] : data.packinglists;
                    var arr = data.packinglists.map(function(packinglists) {
                        return packinglists;
                    });
                    renderPackinglists(arr);
                } else {
                    $('.packinglists-all').html("<p>Нет заявок</p>");
                }
                //закрываем модальное окно
                $('.button-default-accept').click();
            }
        });
    }
    
    //ptint orders for customers
    function renderOrders(arr) {
        var html = '';
        arr.forEach(function(en) {
            var orderString = getHtmlOrderString(en);
            var htmlOrderButton = '<tr class="order-string" order-id="' + en.id + '">' + orderString +
                    '<td><span class="glyphicon glyphicon-ok button-accept-order" data-toggle="modal" data-target="#modal-accept-order"></span></td</tr>';
            //(en.goodspositions ? '<tr><td colspan="2"></td><td colspan="2">' + en.goodspositions.id + '</td><td colspan="2">' + en.goodspositions.count + '</td><td colspan="2">' + en.goodspositions.idGoods.name + '</td><td colspan="1">' + en.goodspositions.idGoods.goodSize + '</td></tr>':'');

            if (en.goodspositions) {
                en.goodspositions = !(en.goodspositions instanceof Array) ? [en.goodspositions] : en.goodspositions;
                var arr = en.goodspositions.map(function(goodsposition) {
                    return goodsposition;
                });
                htmlGoodsInOrder = renderGoodsInOrder(arr);
            } else {
                htmlGoodsInOrder = '<p>Нет товаров в заявке</p>'
            }
            html = '<div class="panel panel-default panel-order-' + en.id + '"><div class="panel-heading"><div class ="row">' +
                    '<div><table class="table table-condensed">' + htmlOrderButton + '</table></div>' +
                    '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + en.id + '">' +
                    '<div class ="row button-open-order"><div class="col-xs-12"></div></div></a></div></div>' +
                    '<div id="collapse' + en.id + '" order-id = "' + en.id + '" class="panel-collapse collapse"><div class="panel-body"><div class="table-goods-in-order">' +
                    htmlGoodsInOrder +
                    '</div></div></div></div>' + html;
        });
        $('.orders-all').html(html);
        addOrdersClick();
    }
    
    function renderPackinglists(arr){
        var html = '';
        arr.forEach(function(en) {
            var packinglistString = getHtmlPackinglistString(en);
            var htmlOrderButton = '<tr class="packinglist-string" packinglist-id="' + en.id + '">' + packinglistString +
                    '<td><span class="glyphicon glyphicon-ok button-accept-packinglist" data-toggle="modal" data-target="#modal-accept-packinglist"></span></td</tr>';

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
                    '<a data-toggle="collapse" data-parent="#accordion" href="#collapsepl' + en.id + '">' +
                    '<div class ="row button-open-packinglist"><div class="col-xs-12"></div></div></a></div></div>' +
                    '<div id="collapsepl' + en.id + '" packinglist-id = "' + en.id + '" class="panel-collapse collapse"><div class="panel-body"><div class="table-goods-in-order">' +
                    htmlOrderInPL +
                    '</div></div></div></div>' + html;
        });
        $('.packinglists-all').html(html);
        addPackinglistsClick();
    }
    
    function getHtmlOrderString(en) {
        var htmlDistrict = '';
        if (en.idDistrict === undefined) {
            htmlDistrict = '</td><td class = "order-district-id" district-id = "">';
        } else {
            htmlDistrict = '</td><td class = "order-district-id" district-id = "' + en.idDistrict.id + '">' + en.idDistrict.district;
        }
        var html = '<td>' + ((en.id) ? en.id : '') +
                '</td><td class = "order-state" order-state="' + en.state + '">' + (en.state == 1 ? 'На рассмотрении' : (en.state == 2 ? 'Принята' : (en.state == 3 ? 'Доставка' : (en.state == 4 ? 'Закрыта': 'Открыта')))) +
                '</td><td>' + ((new Date(en.date)).toLocaleString()) +
                '</td>' + htmlDistrict +
                '<td class = "order-address">' + ((en.address) ? en.address : '') +
                '</td><td class="order-amount">' + ((en.amount) ? en.amount : '') +
                '</td><td  class="order-size">' + ((en.size) ? en.size : '') + '</td>';
        return html;
    }
    
    function getHtmlPackinglistString(en) {
        console.log(en);
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
    
    function renderGoodsInOrder(arr) {
        var html = '';
        var goodString = '';
        arr.forEach(function(en) {
            goodString = '<tr goodsposition-id="' + en.id + '"><td>' + ((en.idGoods) ? ((en.idGoods.name) ? en.idGoods.name : '') : '') +
                    '</td><td>' + ((en.count) ? en.count : '') +
                    '</td><td>' + ((en.idGoods) ? ((en.idGoods.goodSize) ? en.idGoods.goodSize : '') : '') +
                    '</td><td>' + ((en.idGoods) ? ((en.idGoods.price) ? en.idGoods.price : '') : '') +
                    '</td><td>' + ((en.idGoods && en.count) ? ((en.idGoods.price && en.count) ? (en.idGoods.price * en.count) : '') : '') + '</td>' +
                    '</tr>' + goodString;
        });
        html = '<table class="table table-condensed"><thead><tr><th>Товар</th><th>Кол-во</th><th>Размер</th><th>Цена</th><th>Сумма</th></tr></thead><tbody>' + goodString +
                '</tbody></table>';
        return html;
    }
    
    function renderOrderInPL(arr) {
        var html = '';
        var orderString = '';
        arr.forEach(function(en) {
            orderString = '<tr><td>' + ((en.id) ? en.id : '') +
                '</td><td class = "order-state" order-state="' + en.state + '">' + (en.state == 1 ? 'На рассмотрении' : (en.state == 2 ? 'Принята' : (en.state == 3 ? 'Доставка' :(en.state == 4 ? 'Закрыта': 'Открыта')))) +
                '</td><td>' + ((new Date(en.date)).toLocaleDateString()) +
                '</td><td class = "order-address">' + ((en.address) ? en.address : '') +
                '</td><td class="order-amount">' + ((en.amount) ? en.amount : '') +
                '</td><td  class="order-size">' + ((en.size) ? en.size : '') + '</td></tr>' + orderString;
        });
        html = '<table class="table table-condensed"><thead><tr><th>№ заявки</th><th>Статус</th><th>Дата</th><th>Адрес</th><th>Сумма</th><th>Размер</th></tr></thead><tbody>' + orderString +
                '</tbody></table>';
        return html;
    }
    
    function addOrdersClick(){
        $('.button-accept-order').click(function() {
            orderId = $(this).parents("tr").attr('order-id');
            $(".button-accept-order-yes").attr("button-order-id", orderId);
        });
    }
    
    function addPackinglistsClick() {
        $('.button-accept-packinglist').click(function() {
            packinglistId = $(this).parents("tr").attr('packinglist-id');
            console.log(packinglistId);
            $(".button-accept-packinglist-yes").attr("button-packinglist-id", packinglistId);
        });
    }
    
    getOrdersAll();
    getPackinglistsAll();
})