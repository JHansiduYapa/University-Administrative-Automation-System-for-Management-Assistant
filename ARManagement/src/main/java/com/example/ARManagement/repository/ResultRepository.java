package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ResultRepository extends JpaRepository<Result, Long>, JpaSpecificationExecutor<Result> {
    // Additional custom query methods can be defined here if needed
}

