package com.example.ARManagement.controller;

import com.example.ARManagement.entity.Result;
import com.example.ARManagement.service.ResultSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")
public class ResultController {

    private final ResultSearchService resultSearchService;

    @Autowired
    public ResultController(ResultSearchService resultSearchService) {
        this.resultSearchService = resultSearchService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Result>> searchResults(
            @RequestParam Long departmentId,
            @RequestParam Long batchId,
            @RequestParam Long courseId,
            @RequestParam Long studentId) {

        List<Result> results = resultSearchService.searchResults(departmentId, batchId, courseId, studentId);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}
