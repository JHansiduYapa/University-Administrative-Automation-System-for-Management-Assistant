package com.example.ARManagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Advisor")
public class Advisor {

    @EmbeddedId
    private AdvisorId id;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("lecturerId")
    @JoinColumn(name = "lecturer_id", nullable = false)
    private Lecturer advisor; // the lecturer acting as advisor

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("studentId")
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
}
