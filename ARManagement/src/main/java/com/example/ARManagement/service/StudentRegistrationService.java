package com.example.ARManagement.service;

import com.example.ARManagement.entity.Student;
import com.example.ARManagement.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentRegistrationService {

    @Autowired
    private StudentRepository studentRepository;

    /**
     * Registers a new student.
     * Ensures that the student's GPA is set to 0 initially.
     *
     * @param student the student object from the registration request.
     * @return the saved student entity.
     */
    @Transactional
    public Student registerStudent(Student student) {
        // ensure GPA is initially 0
        student.setGpa(0.0);
        // save the student to the database
        return studentRepository.save(student);
    }
}