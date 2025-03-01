package com.example.ARManagement.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
    @JoinColumn(name = "semesterId", nullable = false)
    private Semester semester;
}
