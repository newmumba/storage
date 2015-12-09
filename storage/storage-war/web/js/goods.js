$(document).ready(function () {
    var path = "http://localhost:8080/storage-war/api/goods";
    
    //Кнопка "Добавить"
    $('.button-add-good').click(function(){
        var buttonContext = $('.button-add-good').attr('button-context');
        if(buttonContext === 'add'){
            createGood();
        }else if(buttonContext === 'change'){
            changeGood();
        }else{
            $('.button-default-add').click();
        } 
    });
    
    $('.button-add').click(function(){
        $('#name').val("");
        $('#goodSize').val("");
        $('#price').val("");
        $('#myModalLabel').html("Добавление товара");
        $('.button-add-good').html("Добавить");
        $('.button-add-good').attr("button-context", "add");
        $('.button-add-good').attr("good-id", "");
    });
    
    $('.button-delete-good').click(function() {
        var goodId = $(this).attr("button-good-id");
        if (goodId !== "")
            delGood(goodId);
    });
    
    //добавление товара 
    function createGood() {
        var newGood = {
        	'name': $('#name').val(),
        	'goodSize': $('#goodSize').val(),
        	'price': $('#price').val()
        };
        $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        'type': 'POST',
        'url': path,
        'data': JSON.stringify(newGood),
        'dataType': 'json',
        'success': function(data) {
            $('.button-default-add').click();
            getGoodsAll();
            $('#name').val("");
            $('#goodSize').val("");
            $('#price').val("");
        }
        });
    }
    
    //изменение товара
    function changeGood() {
        var id = $('.button-add-good').attr('good-id');
        var newGood = {
            'name': $('#name').val(),
            'goodSize': $('#goodSize').val(),
            'price': $('#price').val()
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': path + '/update/' + id,
            'data': JSON.stringify(newGood),
            'dataType': 'json',
            'success': function(data) {
                $('.button-default-add').click();
                $('#name').val("");
                $('#goodSize').val("");
                $('#price').val("");
                
                //получаем новую строку товара
                var html = getHtmlGoodString(data);
                //удаляем инфу о товаре
                $('tr[good-id='+ id +']').children("td:lt(4)").remove();
                //заменяем строку товара на новую
                $('tr[good-id='+ id +']').prepend(html);
            }
        });
    }
    
    //получение всех товаров
    function getGoodsAll(){
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
                    data.goods = !(data.goods instanceof Array) ? [data.goods] : data.goods;
                    var arr = data.goods.map(function(good) {
                        return good;
                    });
                    renderGoodsAll(arr);
                }else{
                    var html = '<p>Ни одного товара не добавлено!<p>';
                    $('.goods-all').html(html);
                }
            }
        });
    }
    
    //плюс
    function incGood(goodId, cont){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': path + "/inc",
            'data': goodId,
            'dataType': 'json',
            'success': function(data) {
                //получаем новую строку товара
                var html = getHtmlGoodString(data);
                //удаляем инфу о товаре
                $(cont).parents("tr").children("td:lt(4)").remove();
                //заменяем строку товара на новую
                $(cont).parents("tr").prepend(html);
            }
        });
    }
    
    //минус
    function decGood(goodId, cont){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': path + "/dec",
            'data': goodId,
            'dataType': 'json',
            'success': function(data) {
                //получаем новую строку товара
                var html = getHtmlGoodString(data);
                //удаляем инфу о товаре
                $(cont).parents("tr").children("td:lt(4)").remove();
                //заменяем строку товара на новую
                $(cont).parents("tr").prepend(html);
            }
        });
    }
    
    //удалить
    function delGood(goodId){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'DELETE',
            'url': path,
            'data': goodId,
            'dataType': 'json',
            'success': function(data) {
                //удаляем инфу о товаре
                $('tr[good-id='+ goodId +']').remove();
                //закрываем модальное окно
                $('.button-default-delete').click();
            }
        });
    }
    
    //делаем строку товара в таблице.
    function getHtmlGoodString(en){
        var html = '<td class = "good-name">' + en.name + '</td><td class = "good-size">' + en.goodSize + '</td><td class = "good-price">' + en.price + '</td><td>' + en.count + '</td>';
        return html;
    }
    
    //вывод всех товаров.
    function renderGoodsAll(arr){
        var html = '';
        arr.forEach(function(en){
            var goodString = getHtmlGoodString(en);
            html = '<tr class="good-string" good-id="'+ en.id +'">' + goodString +
                    '<td><span class="glyphicon glyphicon-pencil button-change" data-toggle="modal" data-target="#myModal"></span></td>' + 
                    '<td><span class="glyphicon glyphicon-plus button-plus"></span></td>' +
                    '<td><span class="glyphicon glyphicon-minus button-minus"></span></td>' +
                    '<td><span class="glyphicon glyphicon-trash button-delete" data-toggle="modal" data-target=".bs-example-modal-sm"></span></td></tr>' + html ;
        });     
        html = '<table class="table table-condense"><thead><tr><th>Название</th><th>Размер</th><th>Цена</th><th>Количество</th><th></th><th></th><th></th><th></th></tr></thead><tbody>' + html + '</tbody></table>';
        $('.goods-all').html(html);
        //Добавляем обработчик нажатий
        addClick();
    }

    //кликер
    function addClick(){
        $('.button-plus').click(function() {
            var goodId = $(this).parents("tr").attr('good-id');
            incGood(goodId, this);
        });
        
        $('.button-minus').click(function() {
            var goodId = $(this).parents("tr").attr('good-id');
            decGood(goodId, this);
        });
        
        $('.button-delete').click(function() {
            goodId = $(this).parents("tr").attr('good-id');
            $(".button-delete-good").attr("button-good-id", goodId);
        });
        
        $('.button-change').click(function() {
            goodId = $(this).parents("tr").attr('good-id');
            $(".button-delete-good").attr("button-good-id", goodId);
            $('#name').val($(this).parents("tr").children(".good-name").html())
            $('#goodSize').val($(this).parents("tr").children(".good-size").html());
            $('#price').val($(this).parents("tr").children(".good-price").html());
            $('#myModalLabel').html("Изменение товара");
            $('.button-add-good').html("Изменить");
            $('.button-add-good').attr("button-context", "change");
            $('.button-add-good').attr("good-id", goodId);
        });
    }
    //выводим все товары
    getGoodsAll();
});