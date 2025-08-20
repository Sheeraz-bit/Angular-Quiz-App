package com.example.Quiz.Management.System;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class ServiceConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())               // Disable CSRF
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()               // Allow all requests without auth
            );

        return http.build();
    }
}
