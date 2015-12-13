<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/header.jsp" />
<h3>Заявки:</h3>

<div class="panel-group orders-all" id="accordion">

</div>

<!-- Modal-Accept-Order -->
<div id="modal-accept-order" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="acceptOrderModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="sendModalLabel">Принятие заявки</h4>
            </div>
            <div class="modal-body">
                Принять заявку?
                <button type="button" class="btn btn-default button-default-accept" data-dismiss="modal">Нет</button>
                <button button-order-id="" type="button" class="btn btn-primary button-accept-order-yes">Да</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<jsp:include page="/WEB-INF/footer.jsp" />
<script src="js/orders.js"></script>
</body>
</html>