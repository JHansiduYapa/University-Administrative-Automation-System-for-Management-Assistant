package com.example.ARManagement.controller;

import com.example.ARManagement.entity.Semester;
import com.example.ARManagement.service.SemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/semester")
public class SemesterController {

    @Autowired
    SemesterService semesterService;
    @RequestMapping("/")
    public List<Semester> getSemesters(){
        return semesterService.allSemesters();
    }
    @RequestMapping("/test")
    public String testing(){
        return "test pass";
    }
    @PostMapping("/add")
    public Semester addSemester(@RequestBody Semester semester){
        return semesterService.addSemester(semester);
    }
}
