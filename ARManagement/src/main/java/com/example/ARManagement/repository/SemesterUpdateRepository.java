package com.example.ARManagement.repository;

import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

@Repository
public interface SemesterUpdateRepository {

    @Procedure(procedureName = "update_semester_name")
    void updateSemesterName(String dateParam);
}
