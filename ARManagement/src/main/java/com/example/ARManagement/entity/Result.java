package com.example.ARManagement.entity;

import com.example.ARManagement.enums.Grade;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public class Result {
    @Id
    @Column(name = "result_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long resultId;

    @Column(name = "grade", nullable = false)
    private Grade grade;

    @Column(name = "marks", nullable = false)
    private Integer marks;
}
