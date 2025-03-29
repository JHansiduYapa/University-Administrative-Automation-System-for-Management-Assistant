package com.example.ARManagement.controller;

import com.example.ARManagement.dto.ResultSearchCriteria;
import com.example.ARManagement.entity.Result;
import com.example.ARManagement.service.ResultSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
// Enable CORS for this controller or a specific endpoint. Adjust the origins as needed.
@CrossOrigin(origins = "http://localhost:5173")
public class ResultController {

    @Autowired
    private ResultSearchService resultSearchService;

    // Accepts a POST request with search criteria in the request body and returns a JSON array of Result objects.
    @GetMapping("/search")
    public ResponseEntity<List<Result>> searchResults(@RequestBody ResultSearchCriteria criteria) {
        List<Result> results = resultSearchService.searchResults(criteria);
        return ResponseEntity.ok(results);
    }
}
