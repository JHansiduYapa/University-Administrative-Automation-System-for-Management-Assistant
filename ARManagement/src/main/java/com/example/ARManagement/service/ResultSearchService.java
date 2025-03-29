package com.example.ARManagement.service;

import com.example.ARManagement.dto.ResultSearchCriteria;
import com.example.ARManagement.entity.Result;
import com.example.ARManagement.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultSearchService {

    @Autowired
    private ResultRepository resultRepository;

    public List<Result> searchResults(ResultSearchCriteria criteria) {
        Specification<Result> spec = Specification.where(null);

        if (criteria.getStudentId() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("student").get("studentId"), criteria.getStudentId()));
        }
        if (criteria.getCourseId() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("course").get("courseId"), criteria.getCourseId()));
        }
        if (criteria.getBatchId() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("batch").get("batchId"), criteria.getBatchId()));
        }
        if (criteria.getDepartmentId() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("department").get("departmentId"), criteria.getDepartmentId()));
        }

        return resultRepository.findAll(spec);
    }
}
