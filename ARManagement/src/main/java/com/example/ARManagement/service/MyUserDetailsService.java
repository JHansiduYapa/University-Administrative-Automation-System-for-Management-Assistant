package com.example.ARManagement.service;

import com.example.ARManagement.entity.UserPrincipal;
import com.example.ARManagement.entity.Users;
import com.example.ARManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = repo.findByUsername(username);
        if (users == null) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }
        return new UserPrincipal(users);
    }
}
