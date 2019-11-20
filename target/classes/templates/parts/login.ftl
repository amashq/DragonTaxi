<#macro login path>
<!--начало страница логин пароль-->

<form action="${path}" method="post" xmlns="http://www.w3.org/1999/html">
<div class="container center-block">
    <div class="col-sm-5 offset-3" id="FormaLoginPass">
        <div class="login">Вход</div>
        <input type="text" name="username" value="<#if user??>${user.username}</#if>"
               class="input ${(usernameError??)?string('is-invalid', '')}"
               placeholder="Имя">
        <#if usernameError??>
            <div class="invalid-feedback">
                ${usernameError}
            </div>
        </#if>

        <br>
        <input type="password" name="password"
               class="input ${(passwordError??)?string('is-invalid', '')}"
               placeholder="Пароль">
        <#if passwordError??>
            <div class="invalid-feedback">
                ${passwordError}
            </div>
        </#if>
        <br>
        <input type="hidden" name="_csrf" value="${_csrf.token}" />
<!--        <button id="buttoncomein" name="singlebutton" class="btn btn-primary"-->
<!--                onClick='location.href="/manager"'>ВОЙТИ (менеджер)</button>-->
        <button id="buttoncomein2" name="singlebutton" class="btn btn-primary"
                type="submit" >ВОЙТИ</button>

    </div>
</div>
</form>
<!--конец страница логин пароль-->

</#macro>

<#macro logout>
<form action="/logout" method="post">
    <input type="hidden" name="_csrf" value="${_csrf.token}" />
    <button id="button_order" class="btn btn-primary" type="submit"> Выйти</button>
</form>
</#macro>