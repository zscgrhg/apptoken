package com.example.apptoken;

import com.example.apptoken.beans.AppUserDetailsService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.provider.token.AuthorizationServerTokenServices;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;

@SpringBootApplication
@ServletComponentScan
public class ApptokenApplication {

    @Bean
    public UserDetailsService userDetailsService() {
        return new AppUserDetailsService();
    }

//    @Bean
//    @Primary
//    public DefaultTokenServices tokenServices(TokenStore tokenStore) {
//        DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
//        defaultTokenServices.setTokenStore(tokenStore);
//        defaultTokenServices.setSupportRefreshToken(true);
//        defaultTokenServices.setReuseRefreshToken(false);
//        defaultTokenServices.setAccessTokenValiditySeconds(7200);
//        defaultTokenServices.setRefreshTokenValiditySeconds(-1);
//        return defaultTokenServices;
//    }

    public static void main(String[] args) {
        SpringApplication.run(ApptokenApplication.class, args);
    }
}
