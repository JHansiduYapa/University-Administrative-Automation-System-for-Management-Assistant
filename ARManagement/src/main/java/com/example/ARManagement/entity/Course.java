package com.example.ARManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "courses")
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "credit", nullable = false)
    private Integer credit;

    // Fixing semester_id as a foreign key
    @ManyToOne
    @JoinColumn(name = "semester_id", nullable = false)
    private Semester semester;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();

    @ManyToMany(mappedBy = "courses")
    private Set<Lecturer> lecturers = new HashSet<>();

    // One Course has one coordinator (a Lecturer)
    @ManyToOne
    @JoinColumn(name = "coordinator_id", nullable = false)
    private Lecturer coordinator;

    // Default constructor
    public Course() {
    }

    // Parameterized constructor
    public Course(String courseName, Integer credit, Semester semester, Department department) {
        this.courseName = courseName;
        this.credit = credit;
        this.semester = semester;
        this.department = department;
    }
}
