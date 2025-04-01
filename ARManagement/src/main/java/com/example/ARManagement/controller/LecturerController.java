package com.example.ARManagement.controller;

import com.example.ARManagement.dto.LecturerDTO;
import com.example.ARManagement.entity.Lecturer;
import com.example.ARManagement.service.LecturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lecturers")
@CrossOrigin(origins = "http://localhost:5173")
public class LecturerController {

    @Autowired
    private LecturerService lecturerService;

    @GetMapping
    public ResponseEntity<List<LecturerDTO>> getAllLecturers() {
        List<LecturerDTO> lecturers = lecturerService.getAllLecturers();
        return ResponseEntity.ok(lecturers);
    }

    @PutMapping("/setAdviser/{id}")

    public LecturerDTO updateAdviserStatus(@PathVariable Long id, @RequestParam boolean adviserLec) {
        System.out.println(id+""+adviserLec);
        return lecturerService.setAdviser(adviserLec,id);
    }
}
