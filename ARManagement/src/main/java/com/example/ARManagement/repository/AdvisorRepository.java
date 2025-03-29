package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Advisor;
import com.example.ARManagement.entity.AdvisorId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvisorRepository extends JpaRepository<Advisor, AdvisorId> {
    // Additional query methods if needed
}
