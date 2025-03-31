package com.example.ARManagement.controller;

import com.example.ARManagement.dto.SemesterDTO;
import com.example.ARManagement.entity.Semester;
import com.example.ARManagement.service.SemesterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/semesters")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from your React app
public class SemesterController {

    private final SemesterService semesterService;

    public SemesterController(SemesterService semesterService) {
        this.semesterService = semesterService;
    }

    // GET all semesters
    @GetMapping
    public List<Semester> getAllSemesters() {
        return semesterService.getAllSemesters();
    }

    // GET a semester by id
    @GetMapping("/{id}")
    public Semester getSemester(@PathVariable("id") long id) {
        return semesterService.getSemesterById(id);
    }

    // PUT to update a semester
    @PutMapping("/{id}")
    public Semester updateSemester(@PathVariable("id") long id, @RequestBody SemesterDTO dto) {
        dto.setSemesterId(id); // Ensure the ID in URL and DTO are consistent
        return semesterService.updateSemester(dto);
    }
}
