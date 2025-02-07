package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {
    // add custom query methods here.
}