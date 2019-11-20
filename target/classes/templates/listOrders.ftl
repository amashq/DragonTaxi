<#import "parts/common.ftl" as c>
<#import "parts/login.ftl" as l>
<#import "parts/footer.ftl" as f>


<@c.page>

<div id="feedback"></div>

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
       data-show-footer="true">

    <thead>
<!--    <tr>-->
<!--&lt;!&ndash;        <th rowspan="2" data-checkbox="true" data-valign="middle"></th>&ndash;&gt;-->
<!--        <th colspan="9" data-align="center">Заказы</th>-->
<!--    </tr>-->
    <tr>
        <th data-field="ID" data-sortable="true" data-switchabel="false">ID</th>
        <th data-field="Статус" data-sortable="true" data-switchabel="false">Статус</th>
        <th data-field="Клиент" data-sortable="true">Клиент</th>
        <th data-field="Телефон" data-sortable="true">Телефон</th>
        <th data-field="Создан" data-sortable="true">Создан</th>
        <th data-field="Откуда" data-sortable="true">Откуда</th>
        <th data-field="Куда" data-sortable="true">Куда</th>
        <th data-field="Класс" data-sortable="true">Класс дракона</th>
        <th data-field="Дракон" data-sortable="true">Дракон</th>
        <th data-field="Итого" data-sortable="true">Итого</th>
<!--        <th data-field="Кнопка" data-sortable="false">Кнопка</th>-->
        <th data-field="operate" data-formatter="operateFormatter"
            data-align="center" data-events="operateEvents" data-width="100">Action</th>
    </tr>
    </thead>

    <tbody>
    <#list orders as order>
<!--    <form method="post" >-->
<!--        <input type="hidden" name="form_id" value="${order.id}"/>-->
        <tr>
<!--            <td></td>-->
            <td id="id">
                 <#if order.id??>${order.id}<#else>''</#if>

            </td>
            <td contenteditable="true" id='status'>
                 <#if order.status??>${order.status}<#else>''</#if>
            </td>
            <td id='nameCustomer'>
                <#if order.customer??>${order.customer.nameCustomer}<#else>''</#if>
            </td>
            <td id='phoneNumber'>
               <#if order.customer??>${order.customer.phoneNumber}<#else>''</#if>
            </td>
            <td id='timeTravel'>
                <#if order.timeTravel??>${order.timeTravel}<#else>''</#if>
            </td>
            <td id='startAddress'>
                <#if order.startAddress??>${order.startAddress}<#else>''</#if>
            </td>
            <td id='destAddress'>
                <#if order.destAddress??>${order.destAddress}<#else>''</#if>
            </td>
            <td id='classD'>
               <#if order.classD??>${order.classD}<#else>''</#if>
            </td>
            <td id='Dragon'>
                <#if order.dragon??>${order.dragon}<#else>''</#if>
            </td>
            <td id='sum'>
                <#if order.sum??>${order.sum}<#else>''</#if>
            </td>
            <td>
                <input type="hidden" name="_csrf" value="${_csrf.token}" />
            </td>
        </tr>
<!--    </form>-->
    <#else>
    No orders
    </#list>
    </tbody>
</table>

    <!--    кнопка добавить строку-->
    <div class="row">
        <div class="col-md-12 text-right">
            <button class="btn btn-default btn-primary" data-toggle="modal" data-target="#addForm">
                <i class="fa fa-plus-circle fa-2x"></i>
            </button>
        </div>
    </div>
</div>


</div>

<!--форма добавить строку-->
<!-- Add Modal -->
<div class="modal fade" id="addForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ввод заказа</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
<!--                    <div class="form-group">-->
<!--                        <label for="inputOrderStatus">Введите статус заказа</label>-->
<!--                        <input type="text" class="form-control" id="inputOrderStatus" placeholder="Введите статус заказа" -->
<!--                               value="Получен" disabled >-->
<!--                    </div>-->
                    <div class="form-group">
                        <label for="inputCustomer">Введите клиента</label>
                        <input type="text" class="form-control" id="inputCustomer" placeholder="Иван Иванов" required>
                    </div>
                    <div class="form-group">
                        <label for="inputPhone">Введите телефон</label>
                        <input type="text" class="form-control" id="inputPhone" placeholder="8-(555)-555-5555" required>
                    </div>
                    <div class="form-group">
                        <label for="inputTime">Введите время и дату заказа</label>
                        <input type="text" class="form-control" id="inputTime" placeholder="2019-11-11 14:22" required>
                    </div>
                    <div class="form-group">
                        <select class="custom-select" id="inputDeparture"
                                name="startAddress"
                                aria-label="Example select with button addon" required>
                            <option value="" selected disabled>Откуда</option>
                            <option value="1">Амбар</option>
                            <option value="2">Главный амбар</option>
                            <option value="3">Визжащие леса</option>
                            <option value="4">Песня смерти</option>
                            <option value="5">Потерянная бездна</option>
                            <option value="6">Мельница</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="custom-select" id="inputArrival"
                                name="destAddress"
                                aria-label="Example select with button addon" required>
                            <option value="" selected disabled>Куда</option>
                            <option value="1">Главный амбар</option>
                            <option value="2">Амбар</option>
                            <option value="3">Песня смерти</option>
                            <option value="4">Потерянная бездна</option>
                            <option value="5">Визжащие леса</option>
                            <option value="6">Озеро Ларсона</option>
                        </select>
                    </div>
<!--                    <div class="form-group">-->
<!--                        <label for="inputDeparture">Введите точку отправления</label>-->
<!--                        <input type="text" class="form-control" id="inputDeparture" placeholder="Введите точку отправления">-->
<!--                    </div>-->
<!--                    <div class="form-group">-->
<!--                        <label for="inputArrival">Введите точку прибытия</label>-->
<!--                        <input type="text" class="form-control" id="inputArrival" placeholder="Введите точку прибытия">-->
<!--                    </div>-->
                    <div class="form-group">
                        <label for="inputOrderClassD">Введите класс дракона</label>
                        <select class="form-control" id="inputOrderClassD" required>
                            <option value="Разящие">Разящие</option>
                            <option value="Кочегары">Кочегары</option>
                            <option value="Камнееды">Камнееды</option>
                            <option value="Ищейки">Ищейки</option>
                            <option value="Когтевики">Когтевики</option>
                            <option value="Водные">Водные</option>
                            <option value="Загадочные">Загадочные</option>
                        </select>
                    </div>
<!--                    <div class="form-group">-->
<!--                        <label for="inputTotal">Введите итого</label>-->
<!--                        <input type="text" class="form-control" id="inputTotal" placeholder="Введите итого">-->
<!--                    </div>-->
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="closeAddForm" data-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary" id="saveOrderButton">Сохранить</button>
            </div>
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
                <h5 class="modal-title" id="exampleModalLabel2">Редактирование заказа</h5>
<!--                <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
<!--                    <span aria-hidden="true">&times;</span>-->
<!--                    <span aria-hidden="true">&times;</span>-->
<!--                </button>-->
            </div>
            <div class="modal-body">
                <form method="post">
                    <div class="form-group">
                        <label hidden for="inputOrderId2">Id заказа</label>
                        <input hidden type="text" class="form-control" id="inputOrderId2">
                    </div>
                    <div class="form-group">
                        <label hidden for="inputOrderClassD2">Класс дракона</label>
                        <input hidden type="text" class="form-control" id="inputOrderClassD2">
                    </div>
                    <div class="form-group">
                        <label for="inputOrderStatus2">Статус заказа</label>
                        <select class="custom-select" id="inputOrderStatus2"
                                name="startAddress" required>
                            <option value="Получен">Получен</option>
                            <option value="Выполнен">Выполнен</option>
                            <option value="Отменен">Отменен</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="inputCustomer2">Имя клиента</label>
                        <input type="text" class="form-control" id="inputCustomer2" required>
                    </div>
                    <div class="form-group">
                        <label for="inputPhone2">Телефон клиента</label>
                        <input type="text" class="form-control" id="inputPhone2" required>
                    </div>
                    <div class="form-group">
                        <label for="inputTime2">Время и дата заказа</label>
                        <input type="text" class="form-control" id="inputTime2" required>
                    </div>
                    <div class="form-group">
                        <label for="inputDeparture2">Место отправления</label>
                        <input type="text" class="form-control" id="inputDeparture2" required>
                    </div>
                    <div class="form-group">
                        <label for="inputArrival2">Место прибытия</label>
                        <input type="text" class="form-control" id="inputArrival2" required>
                    </div>
                    <div class="form-group">
                        <label for="inputDrago2">Дракон</label>
                        <select class="form-control" id="inputDrago2" required>
<!--                            <list Dragons as item>-->
<!--                            <option name="{item}">{item}</option>-->
<!--                            </list>-->
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="inputTotal2">Сумма заказа</label>
                        <input type="text" class="form-control" id="inputTotal2" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="closeEditForm" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                <button type="button" class="saveEdit btn btn-primary" id="saveEditOrderButton">
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
<script type="text/javascript" src="../static/js/manager.js"></script>
<script type="text/javascript" src="../static/js/bootstrap-table.js"></script>

</@c.page>