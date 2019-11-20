<#include "parts/security.ftl">
<#import "parts/common.ftl" as c>
<#import "parts/footer.ftl" as f>

<@c.page>

<!--заголовок-->
<header>
    <p class="naming-company-locating" align="center" style="color:#000000; letter-spacing: 0.09em; font-size:80px">DRAGON TAXI</p>
</header>
<!--конец заголовок-->

<#if (name == "unknown")>
<!--кнопка заказать такси-->
<div class="col-md-auto text-center ">
    <button id="button_order" name="singlebutton"
            class="btn btn-primary" onClick='location.href="/order"'>ЗАКАЗАТЬ ТАКСИ</button>

</div>
<!--конец кнопка заказть такси-->
</#if>
<!--главное фото дракона-->
<div>
    <figure align="center"><img src="../img/Dragon.png" alt="Dragon"></figure>
</div>
<!--конец главное фото дракона-->

<@f.footer>
</@f.footer>



<!--ссылки для страницы с шапкой сайта-->

<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js" type="text/javascript"></script>
<script src="https:////cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script src="../static/js/motion.js"></script>
</div>

</@c.page>
