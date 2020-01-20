package com.example.Dragonss.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/*.jsx")
                .addResourceLocations("/**/*/");
        registry.addResourceHandler("/*.js")
                .addResourceLocations("/**/*/");
        registry.addResourceHandler("/*.json")
                .addResourceLocations("/app/src/");
//        registry.addResourceHandler("/static/**")
//                .addResourceLocations("classpath:/static/");
        registry.addResourceHandler("/")
                .addResourceLocations("/index.html");
//        registry.addResourceHandler("/img/**")
//                 .addResourceLocations("classpath:/img/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*")
                .allowedMethods("HEAD", "PUT", "DELETE", "POST", "GET", "OPTIONS");
    }

//    public void  addViewController("/login").setViewName("login");
//    }

}