package com.example.ARManagement.entity;

import com.example.ARManagement.enums.Grade;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "result")
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
