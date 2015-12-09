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




<jsp:include page="/WEB-INF/footer.jsp" />
<script src="js/customers.js"></script>
</body>
</html>