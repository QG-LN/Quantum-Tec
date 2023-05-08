package com.project.quantumtec.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * PackageName : com.project.quantumtec.Config
 * FileName : WebMVCConfig
 * Author : Argonaut
 * Date : 2023-05-08
 * Description : CORS문제를 해결하기 위해서 작성
 */
@Configuration
@EnableWebMvc
public class WebMVCConfig implements WebMvcConfigurer {

    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE");
    }
}
