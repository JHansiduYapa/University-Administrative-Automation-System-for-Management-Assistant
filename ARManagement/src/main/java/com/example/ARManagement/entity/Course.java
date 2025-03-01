package com.example.ARManagement.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "credit", nullable = false)
    private Integer credit;

    // Define the many-to-many relationship with Student
    // one Course has many student that can be got from the students
    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();

    @ManyToMany(mappedBy = "courses")
    private Set<Lecturer> lecturers = new HashSet<>();

    // Default constructor
    public Course() {
    }

    // Parameterized constructor
    public Course(Long courseId, String courseName, Integer credit, Integer semesterId, Long departmentId) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.credit = credit;

    }

    // Getters and Setters
    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }



    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
}
