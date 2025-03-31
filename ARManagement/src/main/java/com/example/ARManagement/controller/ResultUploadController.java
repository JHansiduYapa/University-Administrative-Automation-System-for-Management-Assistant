package com.example.ARManagement.controller;

import com.example.ARManagement.service.ResultUploadService;
import com.example.ARManagement.util.CSVHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/results-upload")
public class ResultUploadController {

    @Autowired
    private ResultUploadService resultUploadService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCSV(@RequestParam("file") MultipartFile file) {
        if (CSVHelper.hasCSVFormat(file)) {
            try {
                resultUploadService.saveResults(file);
                return ResponseEntity.ok("File uploaded and data saved successfully.");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                        .body("Error uploading file: " + e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload a CSV file.");
    }
}

