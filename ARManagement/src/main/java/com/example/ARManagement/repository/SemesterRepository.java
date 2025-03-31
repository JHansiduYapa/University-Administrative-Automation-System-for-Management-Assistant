package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, Long> {
    List<Semester> findByEndDateBefore(LocalDate date);
    Optional<Semester> findBySemesterNumber(int semesterNumber);
}

