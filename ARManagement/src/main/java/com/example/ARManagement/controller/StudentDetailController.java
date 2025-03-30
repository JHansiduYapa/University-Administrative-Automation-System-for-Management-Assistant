package com.example.ARManagement.controller;

import com.example.ARManagement.dto.StudentDetailsDTO;
import com.example.ARManagement.entity.Student;
import com.example.ARManagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student-details")  // Changed mapping to avoid conflict with other controllers
@CrossOrigin(origins = "http://localhost:5173")
public class StudentDetailController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<StudentDetailsDTO> getAllStudentDetails() {
        List<Student> students = studentRepository.findAll();
        return students.stream().map(student -> new StudentDetailsDTO(
                student.getStudentId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getDepartment() != null ? student.getDepartment().getDepartmentName() : null,
                student.getSemester() != null ? student.getSemester().getSemesterNumber() : null
        )).collect(Collectors.toList());
    }
}
