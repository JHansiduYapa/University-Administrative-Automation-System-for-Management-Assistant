package com.example.ARManagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "students")
public class Student {

    @Id
    @Column(name = "student_id")
    private String studentId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @ManyToOne
    @JoinColumn(name = "semester_id", nullable = false)
    private Semester semester;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "gpa")
    private Double gpa;

    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @Column(name = "address", nullable = false)
    private String address;

    @ManyToMany
    @JoinTable(
            name = "student_course",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    @JsonIgnore
    private Set<Course> courses = new HashSet<>();

    // for simplicity assume only students are same class (no postgraduate students)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch properBatch;

    @ManyToOne
    @JoinColumn(name = "academic_batch")
    @JsonIgnore
    private Batch academicBatch;

    // Default constructor
    public Student() {}

    // Parameterized constructor (excluding collections)
    public Student(String studentId, String firstName, String middleName, String lastName, Semester semester,
                   LocalDate dateOfBirth, String gender, String email, Double gpa, LocalDate registrationDate,
                   Department department, String address) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.semester = semester;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.email = email;
        this.gpa = gpa;
        this.registrationDate = registrationDate;
        this.department = department;
        this.address = address;
    }

    // Parameterized constructor (including collections)
    public Student(String studentId, String firstName, String middleName, String lastName, Semester semester,
                   LocalDate dateOfBirth, String gender, String email, Double gpa, LocalDate registrationDate,
                   Department department, String address, Set<Course> courses, Role role,
                   Batch properBatch, Batch academicBatch) {
        this(studentId, firstName, middleName, lastName, semester, dateOfBirth, gender, email, gpa, registrationDate, department, address);
        this.courses = courses;
        this.role = role;
        this.properBatch = properBatch;
        this.academicBatch = academicBatch;
    }
}
