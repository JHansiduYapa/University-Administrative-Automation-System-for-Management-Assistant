package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LecturerRepository extends JpaRepository<Lecturer, Long> {
    List<Lecturer> findByDepartmentDepartmentId(Long departmentId);
}
