package com.example.ARManagement.service;

import com.example.ARManagement.dto.StudentDTO;
import com.example.ARManagement.entity.*;
import com.example.ARManagement.repository.BatchRepository;
import com.example.ARManagement.repository.DepartmentRepository;
import com.example.ARManagement.repository.SemesterRepository;
import com.example.ARManagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private SemesterRepository semesterRepository;

    @Autowired
    private BatchRepository batchRepository;

    public Student registerStudent(StudentDTO dto) {
        Student student = new Student();

        // Set basic properties from DTO
        student.setStudentId(dto.getStudentId());
        student.setFirstName(dto.getFirstName());
        student.setMiddleName(dto.getMiddleName());
        student.setLastName(dto.getLastName());
        student.setDateOfBirth(dto.getDateOfBirth());
        student.setGender(dto.getGender());
        student.setEmail(dto.getEmail());
        student.setGpa(dto.getGpa());
        student.setRegistrationDate(dto.getRegistrationDate());
        student.setAddress(dto.getAddress());

        // Look up and assign associated entities
        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));
        student.setDepartment(department);

        Semester semester = semesterRepository.findById(dto.getSemesterId())
                .orElseThrow(() -> new RuntimeException("Semester not found"));
        student.setSemester(semester);

        Batch properBatch = batchRepository.findById(dto.getBatchId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));
        student.setProperBatch(properBatch);

        Batch academicBatch = batchRepository.findById(dto.getAcademicBatchId())
                .orElseThrow(() -> new RuntimeException("Academic batch not found"));
        student.setAcademicBatch(academicBatch);

        return studentRepository.save(student);
    }
}
