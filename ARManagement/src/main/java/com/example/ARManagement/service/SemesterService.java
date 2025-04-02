package com.example.ARManagement.service;

import com.example.ARManagement.dto.SemesterDTO;
import com.example.ARManagement.dto.SemesterDatesDto;
import com.example.ARManagement.entity.Semester;
import com.example.ARManagement.entity.Student;
import com.example.ARManagement.repository.SemesterRepository;
import com.example.ARManagement.repository.StudentRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SemesterService {

    private final SemesterRepository semesterRepository;
    private final StudentRepository studentRepository;

    public SemesterService(SemesterRepository semesterRepository, StudentRepository studentRepository) {
        this.semesterRepository = semesterRepository;
        this.studentRepository = studentRepository;
    }

    // Fetch all semesters
    public List<Semester> getAllSemesters() {
        return semesterRepository.findAll();
    }

    // Fetch a semester by its id
    public Semester getSemesterById(long id) {
        return semesterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Semester not found"));
    }

    // Update semester details using DTO
    public Semester updateSemester(SemesterDTO dto) {
        Optional<Semester> optional = semesterRepository.findById(dto.getSemesterId());
        if (optional.isPresent()) {
            Semester semester = optional.get();
            semester.setStartDate(dto.getStartDate());
            semester.setEndDate(dto.getEndDate());
            semester.setSemesterNumber(dto.getSemesterNumber());
            return semesterRepository.save(semester);
        }
        throw new RuntimeException("Semester not found");
    }

    public List<Semester> updateSemesterDates(SemesterDatesDto dto){
        List<Semester> semesters=semesterRepository.findAll();
        for (Semester semester:semesters) {
            semester.setStartDate(dto.getStartDate());
            semester.setEndDate(dto.getEndDate());
        }
        System.out.println(dto.getEndDate());
        System.out.println(dto.getStartDate());
        return semesterRepository.saveAll(semesters);
    }


    // Run every day at midnight (00:00) -> 0 0 0 * * ?
    // Scheduled task (if you wish to automatically update students when semester ends) run in every minute
    @Scheduled(cron = "0 0/1 * * * ?")
    @Transactional
    public void checkAndUpdateEndedSemesters() {
        LocalDate today = LocalDate.now();
        List<Semester> endedSemesters = semesterRepository.findByEndDateBefore(today);
        for (Semester ended : endedSemesters) {
            // Find next semester by incrementing semester number
            Optional<Semester> nextSemesterOpt = semesterRepository.findBySemesterNumber(ended.getSemesterNumber() + 1);
            if (nextSemesterOpt.isPresent()) {
                Semester nextSemester = nextSemesterOpt.get();
                Set<Student> students = ended.getStudents();
                for (Student student : students) {
                    student.setSemester(nextSemester);
                    studentRepository.save(student);
                }
            }
        }
    }
}
