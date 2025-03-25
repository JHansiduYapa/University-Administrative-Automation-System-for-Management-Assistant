package com.example.ARManagement.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Semester {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private long semesterId;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false)
    private LocalDate startDate;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false)
    private LocalDate endDate;

    @Max(8)
    @Min(0)
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
