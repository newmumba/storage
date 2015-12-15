<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/header.jsp" />
<h3>Интерфейс начальника транспортного отдела</h3>

<!-- Nav tabs -->
<ul class="nav nav-tabs">
    <li class="active"><a href="#packinglists" data-toggle="tab">Накладные</a></li>
    <li><a href="#cars" data-toggle="tab">Машины</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
    <div class="tab-pane fade in active" id="packinglists">
        <div class="packinglists-all"></div>
    </div>
    <div class="tab-pane fade " id="cars">
        <div class="cars-all"></div>
    </div>
</div>

<!-- Modal-Cars -->
<div class="modal fade" id="modal-cars" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="carModalLabel">Назначение машины</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="cars" class="col-sm-2 control-label">Машины</label>
                        <div class="col-sm-10">
                            <select class="form-control select-cars">
                                <option>Ошибка!</option>
                            </select>
                        </div>
                    </div>  
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default button-default-add" data-dismiss="modal">Отмена</button>
                <button type="button" button-context="add" pl-id="" class="btn btn-primary button-add-pl">Назначить</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal-Return-Car-->
<div id="modal-return-car" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="returnCarModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="returnModalLabel">Возврат машины</h4>
            </div>
            <div class="modal-body">
                Вернуть машину в гараж и закрыть накладную?
                <button type="button" class="btn btn-default button-default-return" data-dismiss="modal">Нет</button>
                <button button-car-id="" type="button" class="btn btn-primary button-return-car">Да</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<jsp:include page="/WEB-INF/footer.jsp" />
<script src="js/pl.js"></script>
</body>
</html>