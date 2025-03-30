package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepo extends JpaRepository<Department,Long> {
    Optional<Department> findByDepartmentName(String departmentName);
}
