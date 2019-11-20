<#import "parts/common.ftl" as c>
<#import "parts/login.ftl" as l>
<#import "parts/footer.ftl" as f>

<@c.page>


<div class="container mt-2 mb-2">
    <table id="langTable"
           data-toggle="table"
           data-search="true"
           data-pagination="true"
           data-show-toggle="true"
           data-show-refresh="true"
           data-show-fullscreen="true"
           data-show-pagination-switch="true"
           data-pagination-pre-text="Previous"
           data-pagination-next-text="Next"
           data-pagination-h-align="left"
           data-pagination-detail-h-align="right"
           data-page-list="[10,20,30,all]"
           data-show-columns="true"
           data-detail-formatter="detailFormatter"
           data-show-footer="true">

        <thead>
        <tr>
            <th data-field="ID" data-sortable="true" data-switchabel="false">ID</th>
            <th data-field="Имя" data-sortable="true" data-switchabel="false">Имя дракона</th>
            <th data-field="Класс" style="display: none">Класс дракона</th>
            <th data-field="Заказ" data-sortable="true">В заказе</th>
            <th data-field="Лечение" data-sortable="true">На лечении</th>
            <th data-field="operate" data-formatter="operateFormatter" data-align="center" data-events="operateEvents" data-width="100">Действия</th>
        </tr>
        </thead>
        <tbody>
        <#list dragons as dragon>
        <tr>

            <td id="id">
                <#if dragon.id??>${dragon.id}<#else>''</#if>

            </td>
            <td id='nameDragon'>
                <#if dragon.name??>${dragon.name}<#else>''</#if>
            </td>
            <td style="display: none" id="classDragon">
            <#if dragon.classDragon??>${dragon.classDragon}<#else>''</#if>

            </td>
            <td id='busy'>
                <#if dragon.busy??>${dragon.busy?string('Да', 'Нет')}<#else>''</#if>
            </td>
            <td id='patient'>
                <#if dragon.patient??>${dragon.patient?string('Да', 'Нет')}<#else>''</#if>
            </td>
            <td>
                <input type="hidden" name="_csrf" value="${_csrf.token}" />
            </td>
        </tr>
        <!--    </form>-->
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



<!--форма редактировать строку-->
    <!-- Edit Modal -->
    <div class="modal fade" id="editForm" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel2">Изменение данных дракона</h5>
                </div>
                <div class="modal-body">
                    <form method="post">
                        <div class="form-group">
                            <label hidden for="inputDragonId">Id дракона</label>
                            <input hidden type="text" class="form-control" id="inputDragonId">
                        </div>
                        <div class="form-group">
                            <label for="inputDragonName">Имя дракона</label>
                            <input type="text" class="form-control" id="inputDragonName" required>
                        </div>
                        <div class="form-group">
                        <label hidden for="inputDragonClassD">Класс дракона</label>
                        <input hidden type="text" class="form-control" id="inputDragonClassD">
                    </div>
                        <div class="form-group">
                        <label for="inputDragonBusy">В заказе</label>
                        <select class="custom-select" id="inputDragonBusy"
                                name="busy" required>
                            <option value="Да">Да</option>
                            <option value="Нет">Нет</option>
                        </select>
                    </div>
                        <div class="form-group">
                            <label for="inputDragonPatient">На лечении</label>
                            <select class="custom-select" id="inputDragonPatient"
                                    name="patient" required>
                                <option value="Да">Да</option>
                                <option value="Нет">Нет</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="closeEditForm" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                    <button type="button" class="saveEdit btn btn-primary" id="saveDragonButton">
                        Сохранить изменения</button>
                </div>
            </div>
        </div>
    </div>

    <!--      всплывающее окно -->
    <div class="form-popup" id="popUpForm">
        <form action="#" class="form-container">
            <h1>Данные изменены!</h1>
            <ul><li>
                <button id="button_order" type="button" class="btn btn-primary cancel" onclick="closeForm()">Закрыть</button>
            </li></ul>
        </form>
    </div>

    <!--footer-->
    <@f.footer>
    </@f.footer>
    <!--footer-->
</div>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/bootstrap-table@1.15.4/dist/bootstrap-table.min.js"></script>
    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.js"></script>-->
    <!--<script src="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"></script>-->
    <script type="text/javascript" src="../static/js/dragonolog.js"></script>
    <script type="text/javascript" src="../static/js/bootstrap-table.js"></script>

</@c.page>