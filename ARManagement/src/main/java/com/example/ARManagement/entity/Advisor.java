package com.example.ARManagement.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "Advisor")
public class Advisor {

    @Id
    @JoinColumn(name = "lecturer_id", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER)
    private Lecturer advisorId;

    @Id
    @JoinColumn(name = "student_id", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER)
    private Student studentId;

}
