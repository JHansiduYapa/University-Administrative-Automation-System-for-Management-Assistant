package com.example.ARManagement.controller;

import com.example.ARManagement.dto.AdvisorStudentDTO;
import com.example.ARManagement.service.AdviseeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/advisor-info")
@CrossOrigin(origins = "http://localhost:5173")
public class AdviseeController {

    @Autowired
    private AdviseeService adviseeService;

//    private final AdvisorService advisorService;
//
//    public AdviseeController(AdvisorService advisorService) {
//        this.advisorService = advisorService;
//    }
//
//    @GetMapping
//    public List<AdvisorStudentDTO> getAdvisorStudentInfos() {
//        return advisorService.getAdvisorStudentInfos();
//    }
    @GetMapping("/")
    public List<AdvisorStudentDTO> getAdvisees(
            @RequestParam Long batch,
            @RequestParam(required = false) Long department) {
        return adviseeService.getAdvisees(batch, department);
    }
    @PostMapping("/distribute")
    public List<AdvisorStudentDTO> distributeStudents(
            @RequestParam Long batchId,
            @RequestParam(required = false) Long departmentId) {

        adviseeService.distributeStudents(batchId, departmentId);
        return adviseeService.getAdvisees(batchId, departmentId);
    }

}
