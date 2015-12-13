<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/header.jsp" />
<div class="row customer-container">
    <div class ="col-md-6 customer-info">
        <div class="customers-all"></div>  
    </div>
    <div class="col-md-6 button">
        <button class="btn btn-default button-order" data-toggle="modal" data-target="#modal-order">Новая заявка</button>
    </div>
</div>
<h3>Заявки:</h3>

<div class="panel-group orders-all" id="accordion">
 
</div>
<!-- Modal-Order -->
<div class="modal fade" id="modal-order" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="orderModalLabel">Добавление заявки</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="order-district" class="col-sm-2 control-label">Район</label>
                        <div class="col-sm-10">
                            <select class="form-control select-district">
                                <option>Ошибка!</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="order-address" class="col-sm-2 control-label">Адрес</label>
                        <div class="col-sm-10">
                            <input class="form-control" id="order-address">
                        </div>
                    </div>   
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default button-default-add" data-dismiss="modal">Отмена</button>
                <button type="button" button-context="add" order-id="" class="btn btn-primary button-add-order">Добавить</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal-Goods-in-Order -->
<div class="modal fade" id="modal-good" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="goodModalLabel">Добавление товара в заявку</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="select-goods" class="col-sm-2 control-label">Товар</label>
                        <div class="col-sm-10">
                            <select class="form-control select-goods">
                                <option>Ошибка!</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="good-count" class="col-sm-2 control-label">Количество</label>
                        <div class="col-sm-10">
                            <input class="form-control" id="good-count">
                        </div>
                    </div>   
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default button-default-add" data-dismiss="modal">Отмена</button>
                <button type="button" button-context="add" order-id="" class="btn btn-primary button-add-good">Добавить</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal-Delete-Order -->
<div id="modal-delete-order" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="deleteOrderModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="deleteOrderModalLabel">Удаление заявки</h4>
            </div>
            <div class="modal-body">
                Точно удалить заявку?
                <button type="button" class="btn btn-default button-default-delete" data-dismiss="modal">Нет</button>
                <button button-order-id="" type="button" class="btn btn-primary button-delete-order-yes">Да</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Modal-Delete-Good-In-Order -->
<div id="modal-delete-good-in-order" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="deleteGoodInOrderModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="deleteGoodModalLabel">Удаление товара</h4>
            </div>
            <div class="modal-body">
                Точно удалить товар в заявке?
                <button type="button" class="btn btn-default button-default-delete" data-dismiss="modal">Нет</button>
                <button button-goodsposition-id="" button-gp-order-id="" type="button" class="btn btn-primary button-delete-good-yes">Да</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Modal-Send-Order -->
<div id="modal-send-order" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="sendOrderModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="sendModalLabel">Отправка заявки</h4>
            </div>
            <div class="modal-body">
                Отправить заявку?
                <button type="button" class="btn btn-default button-default-send" data-dismiss="modal">Нет</button>
                <button button-order-id="" type="button" class="btn btn-primary button-send-order">Да</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<jsp:include page="/WEB-INF/footer.jsp" />
<script src="js/user.js"></script>
</body>
</html>