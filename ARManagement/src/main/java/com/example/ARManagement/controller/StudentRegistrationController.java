package com.example.ARManagement.controller;

import com.example.ARManagement.entity.Student;
import com.example.ARManagement.service.StudentRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin("http://localhost:5173")
public class StudentRegistrationController {

    @Autowired
    private StudentRegistrationService registrationService;

    /**
     * Endpoint for student registration.
     * Expects a JSON payload that maps to the Student entity.
     *
     * Example JSON:
     * {
     *   "studentId": 1,
     *   "firstName": "John",
     *   "middleName": "A.",
     *   "lastName": "Doe",
     *   "semester": 1,
     *   "dateOfBirth": "2000-01-15",
     *   "gender": "Male",
     *   "email": "john.doe@example.com",
     *   "registrationDate": "2025-02-07",
     *   "departmentId": 101,
     *   "address": "123 Main St"
     * }
     *
     * @param student the student registration details.
     * @return the registered student with GPA set to 0.
     */
    @PostMapping("/register")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student
            ,@RequestParam("department") String department,@RequestParam("batch") String batch) {
        // give to the service class to enter the student details to the repository
        Student savedStudent = registrationService.registerStudent(student,department, Long.valueOf(batch));

        // response back to the ResponseEntity ok result
        return ResponseEntity.ok(savedStudent);
    }
}
