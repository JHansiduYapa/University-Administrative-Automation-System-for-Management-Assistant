package com.example.ARManagement.repository;

import com.example.ARManagement.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    // Define custom queries if needed
}
