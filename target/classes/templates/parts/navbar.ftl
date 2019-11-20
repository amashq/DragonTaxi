<#include "security.ftl">
<#import "login.ftl" as l>

<!-- Navigation -->
<!--начало страница шапка сайта-->
<nav class="navbar navbar-light bg-faded justify-content-end">

    <#if (name == "unknown")>
<!--    style="position: absolute; left:0;"-->
    <nav  class="nav navbar-nav navbar-left">
        <a href="/"><img  src="../../img/IG.png" alt="Dragon taxi"></a>
    </nav>
    </#if>

    <div class="nav navbar-nav navbar-right" id="navbar-main">

        <ul class="navbar navbar-right">
            <#if (name == "unknown")>
            <li class="nav-item">
                <a class="nav-link" href="/about">О компании
                    <span class="sr-only"></span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/services"> Услуги
                    <span class="sr-only"></span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/contacts">Контакты
                    <span class="sr-only"></span>
                </a>
            </li>
            <li class="buttonprivate">
                <a class="btn btn-outline-secondary" href="/login">Личный кабинет
                    <span class="sr-only"></span>
                </a>
            </li>
            </#if>
            <#if isManager>
            <li class="nav-item">
                <a class="nav-link" href="/listOrders">Заказы
                    <span class="sr-only"></span>
                </a>
            </li>
            </#if>
            <#if isDraconolog>
            <li class="nav-item">
                <a class="nav-link" href="/listDragons">Драконы
                    <span class="sr-only"></span>
                </a>
            </li>
            </#if>
            <#if isAdmin>
            <li class="nav-item">
                <a class="nav-link" href="/user">Список пользователей
                    <span class="sr-only"></span>
                </a>
            </li>
            </#if>
            <#if user?? & !(name == "unknown")>
<!--            <li class="nav-item">-->
<!--                <a class="nav-link" href="/user/profile">Профиль</a>-->
<!--                <span class="sr-only"></span>-->
<!--            </li>-->
            <li class="buttonprivate">
                <@l.logout />
            </li>
            </#if>
        </ul>
        <div id="menu-line"></div>
    </div>
</nav>
<!--конец страница шапка сайта-->