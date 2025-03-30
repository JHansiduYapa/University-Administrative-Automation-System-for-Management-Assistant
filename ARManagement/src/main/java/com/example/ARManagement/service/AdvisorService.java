package com.example.ARManagement.service;

import com.example.ARManagement.dto.AdvisorDTO;
import com.example.ARManagement.dto.AdvisorStudentDTO;
import com.example.ARManagement.entity.Advisor;
import com.example.ARManagement.entity.Lecturer;
import com.example.ARManagement.repository.AdvisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdvisorService {

    @Autowired
    private AdvisorRepository advisorRepository;
    // Get all advisors
    public List<AdvisorDTO> getAllAdvisors() {
        List<Advisor> advisors = advisorRepository.findAll();
        return advisors.stream().map(advisor -> {
            Lecturer lecturer = advisor.getAdvisor();
            String lecturerName = lecturer.getFirstName() + " " + lecturer.getLastName();
            String deptName = lecturer.getDepartment().getDepartmentName();
            return new AdvisorDTO(lecturer.getLecturerId(), lecturerName, deptName, lecturer.getEmail());
        }).collect(Collectors.toList());
    }

    public List<AdvisorStudentDTO> getAdvisorStudentInfos() {
        List<Advisor> advisorList = advisorRepository.findAll();

        return advisorList.stream().map(advisor -> {
            // Concatenate first and last names for student and lecturer.
            String studentFullName = advisor.getStudent().getFirstName() + " " + advisor.getStudent().getLastName();
            String lecturerFullName = advisor.getAdvisor().getFirstName() + " " + advisor.getAdvisor().getLastName();

            return new AdvisorStudentDTO(
                    advisor.getStudent().getStudentId(),
                    studentFullName,
                    lecturerFullName
            );
        }).collect(Collectors.toList());
    }
}
