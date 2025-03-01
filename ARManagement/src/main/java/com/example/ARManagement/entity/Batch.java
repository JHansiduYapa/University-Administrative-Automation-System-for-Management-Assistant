package com.example.ARManagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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
    private LocalDate regDate;

    @Column(name = "student_count", nullable = false)
    private Integer studentCount;


}
