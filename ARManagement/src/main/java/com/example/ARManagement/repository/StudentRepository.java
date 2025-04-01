package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, String> {

    // Get students from a specific department and batch
    @Query("SELECT s FROM Student s WHERE s.department.id = :departmentId AND s.properBatch.id = :batchId")
    List<Student> findByDepartmentAndBatch(@Param("departmentId") Long departmentId, @Param("batchId") Long batchId);

    // Get students from a specific batch (any department)
    @Query("SELECT s FROM Student s WHERE s.properBatch.id = :batchId")
    List<Student> findByBatch(@Param("batchId") Long batchId);
}