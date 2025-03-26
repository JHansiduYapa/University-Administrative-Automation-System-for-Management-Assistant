package com.example.ARManagement.entity;

import com.example.ARManagement.enums.Grade;
import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "results")
public class Result {
    @Id
    @Column(name = "result_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long resultId;

<<<<<<< Updated upstream
=======

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_id", nullable = false)
    private Batch batch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    @Column(name = "grade", nullable = false)
    @Enumerated(EnumType.STRING)
    private Grade grade;

    @Column(name = "marks", nullable = false)
    private Integer marks;
<<<<<<< Updated upstream
=======


<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}
