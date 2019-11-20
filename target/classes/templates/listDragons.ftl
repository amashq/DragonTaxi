<#import "parts/common.ftl" as c>
<#import "parts/login.ftl" as l>
<@c.page>

<!--<section class="masthead about-section">-->
    <!--    <@l.logout />-->

    <div class="container mt-5 mb-5 mx-auto" style="width: 800px">
        <table style="margin: auto; width: 490px;" class="table table-responsive table-hover">
            <thead>
            <tr>
                <th>Класс дракона</th>
                <th>Всего</th>
                <th>Список драконов</th>
            </tr>
            </thead>
            <tbody>
                    <#list countDragon as classDragon, cnt >
                    <form method="post" action="/nameDragons">
                        <tr>
                            <td>
                                <input type='hidden' name='classDragon' value='${classDragon}'>
                                <label class="col-sm-2 col-form-label">
                                    <#if countDragon??>${classDragon}
                                    <#else>
                                    ''
                                    </#if>
                                </label>
                            </td>
                            <td>
                                <div class="col-sm-2 col-form-label">
                                <b>${cnt}</b>
                                </div>
                            </td>
<!--                            <td>-->
<!--                                <div class="col-sm-2 col-form-label">-->
<!--                                    <b>В заказах {busy}</b>-->
<!--                                </div>-->
<!--                            </td>-->
<!--                            <td>-->
<!--                                <div class="col-sm-2 col-form-label">-->
<!--                                    <b>На лечении <#if countDragon??>{patient}-->
<!--                                        <#else>-->
<!--                                        ''-->
<!--                                    </#if></b>-->
<!--                                </div>-->
<!--                            </td>-->
                            <td>
                                <input type="hidden" name="_csrf" value="${_csrf.token}" />
                                <div>
                                    <button class="btn btn-primary bb" type="submit">Просмотреть</button>
                                </div>
                            </td>
                        </tr>
                    </form>
                    <#else>
                    No dragons
                    </#list>

            </tbody>
                    </table>

        <!--    кнопка добавить строку-->
        <div class="row">
            <div class="col-md-12 text-right">
                <button class="btn btn-default btn-primary" data-toggle="modal" onclick="location.href='/main'"
                        data-target="#add">
                    <i class="fa fa-plus-circle fa-2x"></i>
                </button>
            </div>
        </div>
    </div>
            </div>



<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
<script src="https://unpkg.com/bootstrap-table@1.15.4/dist/bootstrap-table.min.js"></script>
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.js"></script>-->
<!--<script src="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"></script>-->
<script type="text/javascript" src="../static/js/manager.js"></script>
<script type="text/javascript" src="../static/js/bootstrap-table.js"></script>

</@c.page>