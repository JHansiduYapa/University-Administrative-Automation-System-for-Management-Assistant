package com.example.ARManagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "batch")
@AllArgsConstructor
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
    @JoinColumn(name = "semester_id")
    @JsonBackReference
    private Semester semester;

    @OneToMany(mappedBy = "academicBatch")
    @JsonManagedReference
    private List<Student> allStudents;

    @OneToMany(mappedBy = "properBatch")
    @JsonManagedReference
    private List<Student> properStudents;

    public Batch() {
    }
}
