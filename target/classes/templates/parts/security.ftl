<#assign
known = Session.SPRING_SECURITY_CONTEXT??
>

<#if known>
<#assign
user = Session.SPRING_SECURITY_CONTEXT.authentication.principal
name = user.getUsername()
isAdmin = user.isAdmin()
isManager = user.isManager()
isDraconolog = user.isDraconolog()
>
<#else>
<#assign
name = "unknown"
isAdmin = false
isManager = false
isDraconolog = false

>
</#if>