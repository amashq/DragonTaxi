<#import "parts/common.ftl" as c>

<@c.page>
<section class="masthead about-section">
<h5>${username}</h5>
<form method="post">
    <div class="container d-flex h-100 align-items-center">
        <div class="mx-auto text-center">
            <h1 class="mx-auto my-0 text-uppercase">Вход</h1>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label"> Password:</label>
            <div class="col-sm-10">
                <input type="password" name="password"
                       class="form-control ${(passwordError??)?string('is-invalid', '')}"
                       placeholder="Password" />
                <#if passwordError??>
                <div class="invalid-feedback">
                    ${passwordError}
                </div>
            </#if>
        </div>
    </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label"> Номер телефона</label>
            <div class="col-sm-10">
                <input type="phoneNumber" name="phoneNumber"
                       class="form-control ${(phoneNumberError??)?string('is-invalid', '')}"
                       placeholder="+5-677-45-45-78" value="${phoneNumber!''}"/>
                <#if phoneNumberError??>
                <div class="invalid-feedback">
                    ${phoneNumberError}
                </div>
        </div>
    </div>
</#if>
    <input type="hidden" name="_csrf" value="${_csrf.token}" />
<button class="btn btn-primary js-scroll-trigger" type="submit">Сохранить</button>
</div>
</div>
</form>
</section>
</@c.page>