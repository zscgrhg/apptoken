package com.example.apptoken.beans;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class Actions {
    @RequestMapping("/hello")
    public String hello() {
        return "hello world";
    }
}
