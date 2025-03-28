package com.example.ARManagement.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "batch")
public class Batch {
    @Id
    @Column(name = "batch_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long batchId;

    @Column(name = "batch_name", nullable = false)
    private String batchName;

    @Column(name = "reg_date", nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate regDate;

    @Column(name = "student_count")
    private Integer studentCount;

    @OneToOne
    @JoinColumn(name = "semesterId")
    private Semester semester;

    @OneToMany(mappedBy = "academicBatch")
    private List<Student> allStudents;

    @OneToMany(mappedBy = "properBatch")
    private List<Student> properStudents;

    public Batch(Long batchId, String batchName, LocalDate regDate, Integer studentCount, Semester semester, List<Student> allStudents, List<Student> properStudents) {
        this.batchId = batchId;
        this.batchName = batchName;
        this.regDate = regDate;
        this.studentCount = studentCount;
        this.semester = semester;
        this.allStudents = allStudents;
        this.properStudents = properStudents;
    }

    public Batch() {
    }

    public Long getBatchId() {
        return batchId;
    }

    public void setBatchId(Long batchId) {
        this.batchId = batchId;
    }

    public String getBatchName() {
        return batchName;
    }

    public void setBatchName(String batchName) {
        this.batchName = batchName;
    }

    public LocalDate getRegDate() {
        return regDate;
    }

    public void setRegDate(LocalDate regDate) {
        this.regDate = regDate;
    }

    public Integer getStudentCount() {
        return studentCount;
    }

    public void setStudentCount(Integer studentCount) {
        this.studentCount = studentCount;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public List<Student> getAllStudents() {
        return allStudents;
    }

    public void setAllStudents(List<Student> allStudents) {
        this.allStudents = allStudents;
    }

    public List<Student> getProperStudents() {
        return properStudents;
    }

    public void setProperStudents(List<Student> properStudents) {
        this.properStudents = properStudents;
    }

}
