package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BatchRepo extends JpaRepository<Batch, Long> {
}
