$(document).ready(function () {
    var pathPackinglists = "http://localhost:8080/storage-war/api/pl";
     
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
    
    function renderPackinglists(arr) {
        var html = '';
        arr.forEach(function(en) {
            var packinglistString = getHtmlPackinglistString(en);
            var htmlOrderButton = '<tr class="packinglist-string" packinglist-id="' + en.id + '">' + packinglistString +
                    '<td><span class="glyphicon glyphicon-ok button-delivery-packinglist" data-toggle="modal" data-target="#modal-delivery-packinglist"></span></td</tr>';

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
                    '</td><td class = "order-state" order-state="' + en.state + '">' + (en.state == 1 ? 'На рассмотрении' : (en.state == 2 ? 'Принята' : (en.state == 3 ? 'Доставка' : 'Открыта'))) +
                    '</td><td>' + ((new Date(en.date)).toLocaleDateString()) +
                    '</td><td class = "order-address">' + ((en.address) ? en.address : '') +
                    '</td><td class="order-amount">' + ((en.amount) ? en.amount : '') +
                    '</td><td  class="order-size">' + ((en.size) ? en.size : '') + '</td></tr>' + orderString;
        });
        html = '<table class="table table-condensed"><thead><tr><th>№ заявки</th><th>Статус</th><th>Дата</th><th>Адрес</th><th>Сумма</th><th>Размер</th></tr></thead><tbody>' + orderString +
                '</tbody></table>';
        return html;
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
                '</td>' + htmlDistrict +
                '</td><td  class="packinglist-size">' + ((en.plSize) ? en.plSize : '') + '</td>';
        return html;
    }
    
    function addPackinglistsClick() {
        $('.button-delivery-packinglist').click(function() {
            packinglistId = $(this).parents("tr").attr('packinglist-id');
            console.log(packinglistId);
            $(".button-delivery-packinglist-yes").attr("button-packinglist-id", packinglistId);
        });
    }
    
    getPackinglistsAll();
});