package com.example.ARManagement.service;

import com.example.ARManagement.entity.Batch;
import com.example.ARManagement.entity.Semester;
import com.example.ARManagement.repository.BatchRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchService {
    @Autowired
    BatchRepo batchRepo;

    public Batch addSemester(Batch batch){
        return batchRepo.save(batch);
    }
    public List<Batch> allSemesters(){
        return batchRepo.findAll();
    }
}
