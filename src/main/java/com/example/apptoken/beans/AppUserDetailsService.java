package com.example.apptoken.beans;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.HashMap;
import java.util.Map;

public class AppUserDetailsService implements UserDetailsService {
    Map<String, String> data = new HashMap<>();

    public AppUserDetailsService() {
        data.put("nihao", SecurityConfig.BCRYPT_ENCODER.encode("nihao"));
        data.put("hello", SecurityConfig.BCRYPT_ENCODER.encode("hello"));
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        String s1 = data.get(s);
        return new AppUserDetails(s, s1);
    }
}
