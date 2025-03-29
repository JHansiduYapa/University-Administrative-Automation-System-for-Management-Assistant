package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SemesterRepository extends JpaRepository<Semester, Long> {
    // Add custom query methods as required
}
