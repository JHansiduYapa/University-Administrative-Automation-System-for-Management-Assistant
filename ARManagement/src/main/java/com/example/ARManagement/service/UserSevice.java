package com.example.ARManagement.service;


import com.example.ARManagement.entity.Users;
import com.example.ARManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserSevice {
    @Autowired
    UserRepo repo;

    @Autowired
    AuthenticationManager manager;

    @Autowired
    JWTService jwtService;

    private final BCryptPasswordEncoder encoder =new BCryptPasswordEncoder(12);
    public Users register(Users users){
        users.setPassword(encoder.encode(users.getPassword()));
        return repo.save(users);
    }

    public String verify(Users user){
        Authentication authentication =
                manager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
        if (authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUsername());
        }
        return "fail";
    }
}
