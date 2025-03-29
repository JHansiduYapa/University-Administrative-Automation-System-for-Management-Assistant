package com.example.ARManagement.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Semester {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "semester_id")
    private long semesterId;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false)
    private LocalDate startDate;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false)
    private LocalDate endDate;

    @OneToMany(mappedBy = "semester")
    @JsonManagedReference
    private Set<Student> students;  // A semester can have many students

    @Column(nullable = false)
    private int semesterNumber;

    @OneToOne(mappedBy = "semester",cascade = CascadeType.ALL)
    private Batch batch;

    public Semester(LocalDate startDate, LocalDate endDate, int semesterNumber, Batch batch) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.semesterNumber = semesterNumber;
        this.batch = batch;
    }
}
