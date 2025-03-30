package com.example.ARManagement.controller;

import com.example.ARManagement.dto.AdvisorStudentDTO;
import com.example.ARManagement.service.AdvisorService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/advisor-info")
@CrossOrigin(origins = "http://localhost:5173")
public class AdviseeController {

    private final AdvisorService advisorService;

    public AdviseeController(AdvisorService advisorService) {
        this.advisorService = advisorService;
    }

    @GetMapping
    public List<AdvisorStudentDTO> getAdvisorStudentInfos() {
        return advisorService.getAdvisorStudentInfos();
    }
}
