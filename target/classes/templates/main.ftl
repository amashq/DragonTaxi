<#import "parts/common.ftl" as c>
<#import "parts/login.ftl" as l>
<#import "parts/footer.ftl" as f>

<@c.page>
<form method="post">
<div class="container center-block">
    <div class="col-sm-5 offset-3" id="AddDragon">
        <div class="login">Добавление дракона</div>
        <input type="text" class="input ${(nameDragonError??)?string('is-invalid', '')}"
               value="<#if dragon??>${dragon.name}</#if>" name="name"
               placeholder="Введите имя дракона" required/>
        <#if nameDragonError??>
        <div class="invalid-feedback">
            ${nameDragonError}
        </div>
    </#if>

    <br>
    <p><select  size="1" class="input" name="classDragon" required>
        <option value = "" selected disabled>Выберите класс дракона из списка</option>
        <#list clD as item>
        <option name="${item}">${item}</option>
    </#list>
        </select></p>

<input type="hidden" name="_csrf" value="${_csrf.token}" />
<button id="buttoncomein2" name="singlebutton" class="btn btn-primary"
        type="submit" >Добавить дракона</button>

</div>
</div>
</form>

<!--footer-->
<@f.footer>
</@f.footer>
<!--footer-->


</@c.page>