package com.example.ARManagement.service;

import com.example.ARManagement.dto.AdvisorStudentDTO;
import com.example.ARManagement.entity.Student;
import com.example.ARManagement.repository.LecturerRepository;
import com.example.ARManagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdviseeService {
    @Autowired
    LecturerRepository lecturerRepository;

    @Autowired
    StudentRepository studentRepository;

    public List<AdvisorStudentDTO> getAdvisees(Long batch, Long department) {
        List<Student> students;

        if (department == null) {
            students = studentRepository.findByBatch(batch);
        } else {
            students = studentRepository.findByDepartmentAndBatch(department, batch);
        }

        return students.stream().map(student -> new AdvisorStudentDTO(
                student.getStudentId(),
                student.getFirstName() + " " + student.getLastName(),
                (student.getAdviser() != null)
                        ? student.getAdviser().getFirstName() + " " + student.getAdviser().getLastName()
                        : "No Adviser"
        )).collect(Collectors.toList());
    }

    public void distributeStudents(Long batchId, Long departmentId) {
        studentRepository.distributeStudents(batchId, departmentId);
    }

}
