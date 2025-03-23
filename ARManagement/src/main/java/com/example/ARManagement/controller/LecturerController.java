package com.example.ARManagement.controller;

import com.example.ARManagement.entity.Lecturer;
import com.example.ARManagement.service.LecturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lecturers")
public class LecturerController {

    @Autowired
     LecturerService lecturerService;

//    public LecturerController(LecturerService lecturerService) {
//        this.lecturerService = lecturerService;
//    }

    @PostMapping("/add")
    public ResponseEntity<Lecturer> saveLecturer(@RequestBody Lecturer lecturer) {
        return ResponseEntity.ok(lecturerService.saveLecturer(lecturer));
    }

    @GetMapping("/gettall")
    public ResponseEntity<List<Lecturer>> getAllLecturers() {
        return ResponseEntity.ok(lecturerService.getAllLecturers());
    }
}
