package com.example.ARManagement.service;

import com.example.ARManagement.entity.Semester;
import com.example.ARManagement.repository.SemesterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SemesterService {
    @Autowired
    SemesterRepo semesterRepo;

    public Semester addSemester(Semester semester){
        return semesterRepo.save(semester);
    }
    public List<Semester> allSemesters(){
        return semesterRepo.findAll();
    }
}
