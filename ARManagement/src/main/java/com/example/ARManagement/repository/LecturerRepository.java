package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Lecturer;
import com.example.ARManagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LecturerRepository extends JpaRepository<Lecturer, Long> {

    @Query("SELECT l FROM Lecturer l WHERE l.adviserLec = true AND (:departmentId IS NULL OR l.department.departmentId = :departmentId)")
    List<Lecturer> findAdviserLecturersByDepartment(@Param("departmentId") Long departmentId);
}
