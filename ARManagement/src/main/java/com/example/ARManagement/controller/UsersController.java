package com.example.ARManagement.controller;

import com.example.ARManagement.entity.Users;
import com.example.ARManagement.service.UserSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {

    @Autowired
    UserSevice service;
    @PostMapping("/register")
    public String register(@RequestBody Users users){
        Users s;
        String responce;
        try{
            s= service.register(users);
            responce= s.getUsername()+" successfully registered";
        }catch(Exception e){
            responce=e.getMessage();
        }
        return responce;
    }
    @PostMapping("/login")
    public String login(@RequestBody Users users){
        return service.verify(users);
    }

}
