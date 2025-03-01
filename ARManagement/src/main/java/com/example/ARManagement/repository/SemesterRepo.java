package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

public interface SemesterRepo extends JpaRepository<Semester, Long> {
    @Procedure(procedureName = "update_semester_name")
    void updateSemesterName(String dateParam);
}
