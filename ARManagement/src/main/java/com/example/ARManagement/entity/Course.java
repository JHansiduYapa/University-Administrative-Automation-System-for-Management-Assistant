package com.example.ARManagement.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Entity
@Table(name = "courses")
public class Course {

    // Getters and Setters
    @Id
    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "credit", nullable = false)
    private Integer credit;

    @Column(name = "semester_id", nullable = false)
    private Integer semesterId;

    @Column(name = "department_id", nullable = false)
    private Long departmentId;

    // Define the many-to-many relationship with Student
    // one Course has many student that can be got from the students
    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();

    // Default constructor
    public Course() {
    }

    // Parameterized constructor
    public Course(Long courseId, String courseName, Integer credit, Integer semesterId, Long departmentId) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.credit = credit;
        this.semesterId = semesterId;
        this.departmentId = departmentId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public void setSemesterId(Integer semesterId) {
        this.semesterId = semesterId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
}
