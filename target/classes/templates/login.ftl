<#import "parts/common.ftl" as c>
<#import "parts/login.ftl" as l>
<#import "parts/footer.ftl" as f>

<@c.page>

<@l.login "/login" />   <!--false-->
<!---->

<#if Session?? && Session.SPRING_SECURITY_LAST_EXCEPTION??>
<div class="alert alert-dark" role="alert">
    <!--    ${Session.SPRING_SECURITY_LAST_EXCEPTION.message}-->
    Неверные данные
</div>
</#if>

<@f.footer>
</@f.footer>

-
<!--ссылки для страницы с шапкой сайта-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js" type="text/javascript"></script>
<script src="https:////cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script src="../static/js/motion.js"></script>
<!--ссылки для страницы логин/пароль-->
<script src="../static/js/JQuery.js" crossorigin="anonymous"></script>


</@c.page>