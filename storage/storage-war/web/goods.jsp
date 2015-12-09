<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/header.jsp" />
<h1>Товары:</h1>
<div class="buttons">
    <!-- Button trigger modal -->
    <button class="btn btn-default button-add" data-toggle="modal" data-target="#myModal">Добавить</button>
</div>
<div class="goods-all"></div>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Добавление товара</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="name" class="col-sm-2 control-label">Название</label>
                        <div class="col-sm-10">
                            <input class="form-control" id="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="goodSize" class="col-sm-2 control-label">Размер</label>
                        <div class="col-sm-10">
                            <input class="form-control" id="goodSize">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="price" class="col-sm-2 control-label">Цена</label>
                        <div class="col-sm-10">
                            <input class="form-control" id="price">
                        </div>
                    </div>     
                </form>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default button-default-add" data-dismiss="modal">Отмена</button>
              <button type="button" button-context="add" good-id="" class="btn btn-primary button-add-good">Добавить</button>
            </div>
        </div>
    </div>
</div>

 <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="mySmallModalLabel">Удаление товара</h4>
        </div>
        <div class="modal-body">
          Точно удалить товар?
          <button type="button" class="btn btn-default button-default-delete" data-dismiss="modal">Нет</button>
          <button button-good-id="" type="button" class="btn btn-primary button-delete-good">Да</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
<jsp:include page="/WEB-INF/footer.jsp" />
<script src="js/goods.js"></script>
</body>
</html>