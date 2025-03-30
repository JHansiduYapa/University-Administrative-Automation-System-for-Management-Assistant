package com.example.ARManagement.service;

import com.example.ARManagement.entity.Users;
import com.example.ARManagement.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public Users registerUser(String username, String fullName, String password) {
        // Check if the user already exists
        if (usersRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        Users user = new Users();
        user.setUsername(username);
        user.setFullName(fullName);
        user.setPassword(password); // In production, encrypt this password.
        return usersRepository.save(user);
    }

    public Users loginUser(String username, String password) {
        Users user = usersRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }
}
