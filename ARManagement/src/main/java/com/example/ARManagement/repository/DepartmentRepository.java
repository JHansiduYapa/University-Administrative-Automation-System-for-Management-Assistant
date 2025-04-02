package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.example.ARManagement.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByDepartmentName(String departmentName);
}

