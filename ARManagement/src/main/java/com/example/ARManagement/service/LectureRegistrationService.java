package com.example.ARManagement.service;

import com.example.ARManagement.dto.LecturerDTO;
import com.example.ARManagement.entity.Department;
import com.example.ARManagement.entity.Lecturer;
import com.example.ARManagement.repository.DepartmentRepository;
import com.example.ARManagement.repository.LecturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LectureRegistrationService {

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    public LecturerDTO registerLecturer(LecturerDTO lecturerDTO) {
        // Lookup department by name (adjust as necessary for your application)
        Department department = departmentRepository.findByDepartmentName(lecturerDTO.getDepartmentName())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        // Create new Lecturer entity (if your Lecturer entity doesn't have setters, consider adding them or using a builder)
        Lecturer lecturer = new Lecturer();
        lecturer.setFirstName(lecturerDTO.getFirstName());
        lecturer.setLastName(lecturerDTO.getLastName());
        lecturer.setEmail(lecturerDTO.getEmail());
        lecturer.setDepartment(department);

        Lecturer savedLecturer = lecturerRepository.save(lecturer);

        // Map the saved entity back to DTO
        LecturerDTO savedDto = new LecturerDTO();
        savedDto.setLecturerId(savedLecturer.getLecturerId());
        savedDto.setFirstName(savedLecturer.getFirstName());
        savedDto.setLastName(savedLecturer.getLastName());
        savedDto.setEmail(savedLecturer.getEmail());
        savedDto.setDepartmentName(department.getDepartmentName());

        return savedDto;
    }
}
