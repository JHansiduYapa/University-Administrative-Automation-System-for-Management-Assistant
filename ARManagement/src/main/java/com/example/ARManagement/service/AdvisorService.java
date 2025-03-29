package com.example.ARManagement.service;

import com.example.ARManagement.dto.AdvisorDTO;
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

    public List<AdvisorDTO> getAllAdvisors() {
        List<Advisor> advisors = advisorRepository.findAll();
        return advisors.stream().map(advisor -> {
            Lecturer lecturer = advisor.getAdvisor();
            String lecturerName = lecturer.getFirstName() + " " + lecturer.getLastName();
            String deptName = lecturer.getDepartment().getDepartmentName();
            return new AdvisorDTO(lecturer.getLecturerId(), lecturerName, deptName, lecturer.getEmail());
        }).collect(Collectors.toList());
    }
}
