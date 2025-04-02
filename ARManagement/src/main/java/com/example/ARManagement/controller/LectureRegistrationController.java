package com.example.ARManagement.controller;

import com.example.ARManagement.dto.LecturerDTO;
import com.example.ARManagement.service.LectureRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lecturers")
@CrossOrigin(origins = "http://localhost:5173")
public class LectureRegistrationController {

    @Autowired
    private LectureRegistrationService lectureRegistrationService;

    @PostMapping("/register")
    public LecturerDTO registerLecturer(@RequestBody LecturerDTO lecturerDTO) {
        return lectureRegistrationService.registerLecturer(lecturerDTO);
    }
}
