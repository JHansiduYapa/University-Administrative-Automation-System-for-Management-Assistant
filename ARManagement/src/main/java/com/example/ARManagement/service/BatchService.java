package com.example.ARManagement.service;

import com.example.ARManagement.entity.Batch;
import com.example.ARManagement.entity.Semester;
import com.example.ARManagement.repository.BatchRepo;
import com.example.ARManagement.repository.SemesterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BatchService {
    @Autowired
    BatchRepo batchRepo;

    @Autowired
    SemesterRepo semesterRepo;

    public Batch addBatch(Batch batch){
        Semester semester = new Semester(batch.getRegDate(), batch.getRegDate().plusMonths(5L), 0, batch);
        semesterRepo.save(semester);
        batch.setSemester(semester);
        return batchRepo.save(batch);
    }
    public Batch get(Long id){
        return batchRepo.findById(id).get();
    }
    public List<Batch> allBatches(){
        return batchRepo.findAll();
    }
}
