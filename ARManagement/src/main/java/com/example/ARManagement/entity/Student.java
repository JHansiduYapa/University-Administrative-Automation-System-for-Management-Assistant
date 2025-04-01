package com.example.ARManagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@AllArgsConstructor
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @ManyToOne
    @JoinColumn(name = "semester_id", nullable = false)
    @JsonBackReference
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
    @JsonBackReference
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

    @ManyToOne
    @JoinColumn(name = "batch_id")
    @JsonBackReference
    private Batch properBatch;

    @ManyToOne
    @JoinColumn(name = "academic_batch")
    @JsonBackReference
    private Batch academicBatch;

    @ManyToOne
    @JoinColumn(name= "adviser_id")
    @JsonBackReference
    private Lecturer adviser;


    // Default constructor
    public Student() {}

    // Parameterized constructor (excluding collections)
    public Student(Long studentId, String firstName, String middleName, String lastName, Semester semester,
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

}
