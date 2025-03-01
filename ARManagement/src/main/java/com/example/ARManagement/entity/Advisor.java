package com.example.ARManagement.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "Advisor")
public class Advisor {

    @Id
    @Column(name = "advisor_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long advisorId;

    @Column(name = "student_count", nullable = false)
    private Integer studentCount;


}
