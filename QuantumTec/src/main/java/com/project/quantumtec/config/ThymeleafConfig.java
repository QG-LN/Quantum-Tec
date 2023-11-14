package com.project.quantumtec.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.spring6.view.ThymeleafViewResolver;

/**
 * PackageName : com.project.quantumtec.Config
 * FileName : ThymeleafConfig
 * Author : Argonaut
 * Date : 2023-05-26
  * Description :TemplateEngine 객체를 등록
 */
public class ThymeleafConfig implements WebMvcConfigurer {
    @Bean
    public TemplateEngine templateEngine() {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        // 필요한 설정 추가
        return templateEngine;
    }

    @Bean
    public ThymeleafViewResolver thymeleafViewResolver() {
        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
        // 필요한 설정 추가
        return viewResolver;
    }
}
