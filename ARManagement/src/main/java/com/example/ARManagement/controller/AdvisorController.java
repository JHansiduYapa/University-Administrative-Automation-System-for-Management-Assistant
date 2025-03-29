package com.example.ARManagement.controller;

import com.example.ARManagement.dto.AdvisorDTO;
import com.example.ARManagement.service.AdvisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/advisors")
@CrossOrigin(origins = "http://localhost:5173")
public class AdvisorController {

    @Autowired
    private AdvisorService advisorService;

    @GetMapping
    public ResponseEntity<List<AdvisorDTO>> getAdvisors() {
        List<AdvisorDTO> advisorDTOs = advisorService.getAllAdvisors();
        return ResponseEntity.ok(advisorDTOs);
    }
}
