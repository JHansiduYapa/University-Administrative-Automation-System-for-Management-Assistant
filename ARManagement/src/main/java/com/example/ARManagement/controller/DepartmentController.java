package com.example.ARManagement.controller;

import com.example.ARManagement.dto.DepartmentDTO;
import com.example.ARManagement.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:5173")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @GetMapping
    public List<DepartmentDTO> getDepartments() {
        return departmentService.getAllDepartments();
    }
}
