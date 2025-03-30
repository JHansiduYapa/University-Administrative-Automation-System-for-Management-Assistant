package com.example.ARManagement.controller;

import com.example.ARManagement.dto.BatchDTO;
import com.example.ARManagement.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "http://localhost:5173")
public class BatchController {

    @Autowired
    private BatchService batchService;

    // GET endpoint to fetch all batches
    @GetMapping
    public List<BatchDTO> getAllBatches() {
        return batchService.getAllBatches();
    }

    // POST endpoint to create a new batch using the DTO
    @PostMapping
    public BatchDTO createBatch(@RequestBody BatchDTO batchDTO) {
        return batchService.createBatch(batchDTO);
    }
}
