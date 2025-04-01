package com.example.ARManagement.controller;

import com.example.ARManagement.dto.BatchDTO;
import com.example.ARManagement.dto.StudentDTO;
import com.example.ARManagement.entity.Student;
import com.example.ARManagement.service.BatchService;
import com.example.ARManagement.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
    /// {
    ///     // no need to give student id studet id is automatically created
    ///     "firstName": "Janith",
    ///     "middleName": "Hansidu",
    ///     "lastName": "Yapa",
    ///     "dateOfBirth": "2001-01-15",
    ///     "gender": "Male",
    ///     "email": "janithhansiduya@gmail.com", /// email should be different from person to person foreign key contrain
    ///     "gpa": 3.0,
    ///     "registrationDate": "2021-02-07",
    ///     "departmentId": 1,
    ///     "address": "110/B/1, Ja ela road, Akarawita",
    ///     "batchId": 1,
    ///     "academicBatchId": 1
    /// }
    ///
    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/register")
    public ResponseEntity<Student> registerStudent(@RequestBody StudentDTO studentDTO) {
        System.out.println(studentDTO);
        Student savedStudent = registrationService.registerStudent(studentDTO);
        return ResponseEntity.ok(savedStudent);
    }

    @Autowired
    private BatchService batchService;

    @GetMapping
    public List<BatchDTO> getAllBatches() {
        return batchService.getAllBatches();
    }
}

