//package com.example.ARManagement.security;
//
//import com.example.ARManagement.entity.Student;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collections;
//
//public class StudentDetails implements UserDetails {
//
//    private final Student student;
//
//    public StudentDetails(Student student) {
//        this.student = student;
//    }
//
//    // In this simple example, we do not use roles/authorities.
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Collections.emptyList();
//    }
//
//    @Override
//    public String getPassword() {
//        return student.getPassword();
//    }
//
//    @Override
//    public String getUsername() {
//        // We use the student’s email as the username
//        return student.getEmail();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}