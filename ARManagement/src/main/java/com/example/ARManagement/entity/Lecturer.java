package com.example.ARManagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "lecturer")
public class Lecturer {
    @Id
    @Column(name = "lecturer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lecturerId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    @JsonBackReference // This side will be omitted during serialization
    private Department department;

    // One lecturer can coordinate many courses
    @OneToMany(mappedBy = "coordinator")
    @JsonManagedReference
    private Set<Course> coordinatedCourses = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "lecturer_course",
            joinColumns = @JoinColumn(name = "lecturer_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();

    // ad
    @OneToMany(mappedBy = "studentId")
    @JsonManagedReference
    private Set<Student> Advisee= new HashSet<>();

}
