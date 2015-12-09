<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/header.jsp" />
<%
    //response.sendRedirect("index.jsp");
%>
<form class="form-horizontal" role="form" action="#">
    <div class="col-sm-offset-3">
        <h2 class="form-signin-heading form-auth-hrading">Введите логин и пароль</h2>
    </div>
    <div class="form-group">
        <label for="login" class="col-sm-3 control-label">Размер</label>
        <div class="col-sm-6">
            <input type="text" class="form-control" placeholder="Login" id="login" required autofocus>
        </div>
    </div>
    <div class="form-group">
        <label for="password" class="col-sm-3 control-label">Цена</label>
        <div class="col-sm-6">
            <input type="password" class="form-control" placeholder="Password" id="password" required>
        </div>
    </div> 
    <div class="col-sm-6 col-sm-offset-7">  
        <button class="btn btn-primary button-auth">Войти</button>
    </div>
</form>
<jsp:include page="/WEB-INF/footer.jsp" />
<script src="js/login.js"></script>
</body>
</html>