package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

    @Query("SELECT r FROM Result r " +
            "WHERE r.department.departmentId = :departmentId " +
            "AND r.batch.batchId = :batchId " +
            "AND r.course.courseId = :courseId " +
            "AND r.student.studentId = :studentId")
    List<Result> findResults(@Param("departmentId") Long departmentId,
                             @Param("batchId") Long batchId,
                             @Param("courseId") Long courseId,
                             @Param("studentId") String studentId);
}
