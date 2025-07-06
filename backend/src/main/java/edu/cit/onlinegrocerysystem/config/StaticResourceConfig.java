package edu.cit.onlinegrocerysystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(
                        "file:C:/Users/Ross Mikhail/IdeaProjects/IT342-Online-Grocery-System/backend/uploads/",
                        "file:./uploads/");
    }
}
