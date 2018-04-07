package com.example.apptoken;

import com.example.apptoken.beans.AppUserDetailsService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.provider.token.AuthorizationServerTokenServices;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;

@SpringBootApplication
public class ApptokenApplication {

    @Bean
    public UserDetailsService userDetailsService() {
        return new AppUserDetailsService();
    }



    public static void main(String[] args) {
        SpringApplication.run(ApptokenApplication.class, args);
    }
}
