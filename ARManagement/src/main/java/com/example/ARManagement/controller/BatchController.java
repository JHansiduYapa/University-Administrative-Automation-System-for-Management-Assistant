package com.example.ARManagement.controller;

import com.example.ARManagement.entity.Batch;
import com.example.ARManagement.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/batch")
public class BatchController {
    @Autowired
    BatchService batchService;
    @RequestMapping("/")
    public List<Batch> getBatches(){
        return batchService.allBatches();
    }
    @RequestMapping("/test")
    public String testing(){
        return "test pass";
    }
    @PostMapping("/add")
    public Batch addBatch(@RequestBody Batch batch){
        return batchService.addBatch(batch);
    }
}
