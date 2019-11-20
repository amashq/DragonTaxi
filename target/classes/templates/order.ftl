<#import "parts/common.ftl" as c>
<#import "parts/footer.ftl" as f>

<@c.page>

<!--    начало страница заказ-->
<form method="post">
    <div class="container">

        <div class="input-group mb-3">
            <div class="input-group" id="inputGroupSelectName">
                <label class="col-2 col-form-label">Имя</label>
                <input type="text" value="<#if order??>${order.customer.nameCustomer}</#if>"
                       class ="form-control ${(nameError??)?string('is-invalid', '')}"
                       id="formGroupExampleInput1" required
                       name="customer.nameCustomer" placeholder="Иван Иванов">
                <#if nameError??>
                <div class="invalid-feedback">
                    ${nameError}
                </div>
            </#if>
            </div>
            <div class="input-group" id="inputGroupSelectPhone">
                <label class="col-2 col-form-label">Телефон</label>
                <input type="tel" class="form-control ${(phoneError??)?string('is-invalid', '')}"
                       value="<#if order??>${order.customer.phoneNumber}</#if>"
                       id="formGroupExampleInput2" required
                       name="customer.phoneNumber" placeholder="8-(555)-555-5555">
                <#if phoneError??>
                <div class="invalid-feedback">
                    ${phoneError}
                </div>
            </#if>
            </div>
            <div class="input-group">
                <select class="custom-select" id="inputGroupSelectFrom"
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
            <div class="input-group">
                <select class="custom-select" id="inputGroupSelectWhere"
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

            <!--        время и дата-->
            <div class='input-group date' >
                <input type='text' class="form-control" id="datetimepicker"
                placeholder="2019-11-11 14:22" name="timeTravel" required/>
                <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
            </div>
            <!--        время и дата-->

            <!--        выбор класса дракона-->
            <div class="input-group">
                <select class="custom-select" id="inputGroupSelectClass"
                           aria-label="Example select with button addon"
                           name="classD" required>
                    <option value = "" selected disabled>Выберите класс дракона из списка</option>
                    <#list clD as item>
                    <option name="${item}">${item}</option>
                    </#list>
                </select>
            </div>
            <!--        выбор класса дракона-->
        </div>

        <div class="bd-example">
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="5"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="6"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="7"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="../img/5dragon.png" class="d-block" alt="Разящие драконы">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Разящие драконы</h5>
                            <p>Повышенный интеллект, невероятная скорость, уникальный вид атаки и мастерство маскировки</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../img/7dragon.png" class="d-block" alt="Кочегары">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Кочегары</h5>
                            <p>Сильная огневая мощь</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../img/3dragon.png" class="d-block" alt="Камнееды">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Камнееды</h5>
                            <p>Способны переваривать камни</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../img/4dragon.png" class="d-block" alt="Ищейки">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Ищейки</h5>
                            <p>Превосходное обоняние</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../img/2dragon.png" class="d-block" alt="Когтевики">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Когтевики</h5>
                            <p>Драконы с развитыми шипами и когтями</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../img/1dragon.png" class="d-block" alt="Водные">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Водные</h5>
                            <p>Драконы, живущие в воде</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../img/8dragon.png" class="d-block" alt="Загадочные">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Загадочные</h5>
                            <p>Виды драконов, информации о которых катастрофически мало. Данные виды не подходят ни к одному из классов</p>
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>

        <input type="hidden" name="_csrf" value="${_csrf.token}" />
        <div class="input-group">
            <button id="button_order" style="width: 100%;" name="singlebutton"
                    class="btn btn-primary">Заказать</button>
        </div>

    </div>
</form>
<!--    конец страница заказ-->

<@f.footer>
</@f.footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js" type="text/javascript"></script>
<script src="https:////cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="/path/to/jquery.js"></script>
<script type="text/javascript" src="/path/to/moment.js"></script>
<script type="text/javascript" src="/path/to/tempusdominus-bootstrap-4.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script src="../static/js/motion.js"></script>
<script src="../static/js/order.js"></script>
<!--<script src="../static/js/bootstrap-datetimepicker.min.js"></script>-->
<script src="../static/js/bootstrap-datetimepicker.js"></script>




</@c.page>