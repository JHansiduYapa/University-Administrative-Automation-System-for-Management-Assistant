package com.example.ARManagement.service;

import com.example.ARManagement.entity.Department;
import com.example.ARManagement.repository.DepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService {

    @Autowired
    DepartmentRepo departmentRepo;

    public Department addDepartment(Department department){
        return departmentRepo.save(department);
    }
}
