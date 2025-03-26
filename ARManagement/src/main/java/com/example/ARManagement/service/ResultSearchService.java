package com.example.ARManagement.service;

import com.example.ARManagement.entity.Result;
import com.example.ARManagement.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultSearchService {

    private final ResultRepository resultRepository;

    @Autowired
    public ResultSearchService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    public List<Result> searchResults(Long departmentId, Long batchId, Long courseId, Long studentId) {
        return resultRepository.findResults(departmentId, batchId, courseId, studentId);
    }
}
