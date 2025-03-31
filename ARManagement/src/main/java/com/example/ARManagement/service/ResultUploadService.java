package com.example.ARManagement.service;

import com.example.ARManagement.entity.Result;
import com.example.ARManagement.enums.Grade;
import com.example.ARManagement.entity.Batch;
import com.example.ARManagement.entity.Course;
import com.example.ARManagement.entity.Department;
import com.example.ARManagement.entity.Student;
import com.example.ARManagement.repository.BatchRepository;
import com.example.ARManagement.repository.CourseRepository;
import com.example.ARManagement.repository.DepartmentRepository;
import com.example.ARManagement.repository.ResultRepository;
import com.example.ARManagement.repository.StudentRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class ResultUploadService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    public void saveResults(MultipartFile file) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())) {

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord record : csvRecords) {
                // Parse the CSV record
                Long departmentId = Long.parseLong(record.get("departmentId"));
                Long batchId = Long.parseLong(record.get("batchId"));
                Long courseId = Long.parseLong(record.get("courseId"));
                Long studentId = Long.parseLong(record.get("studentId"));
                String gradeStr = record.get("grade");
                Integer marks = Integer.parseInt(record.get("marks"));

                Department department = departmentRepository.findById(departmentId)
                        .orElseThrow(() -> new RuntimeException("Department not found for id " + departmentId));
                Batch batch = batchRepository.findById(batchId)
                        .orElseThrow(() -> new RuntimeException("Batch not found for id " + batchId));
                Course course = courseRepository.findById(courseId)
                        .orElseThrow(() -> new RuntimeException("Course not found for id " + courseId));
                Student student = studentRepository.findById(String.valueOf(studentId))
                        .orElseThrow(() -> new RuntimeException("Student not found for id " + studentId));

                Result result = new Result();
                result.setDepartment(department);
                result.setBatch(batch);
                result.setCourse(course);
                result.setStudent(student);
                result.setGrade(Grade.valueOf(gradeStr));
                result.setMarks(marks);

                resultRepository.save(result);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to store CSV data: " + e.getMessage());
        }
    }
}
