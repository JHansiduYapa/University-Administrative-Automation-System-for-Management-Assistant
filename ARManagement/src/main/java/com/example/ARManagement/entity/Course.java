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

    @Column(name = "semester_id", nullable = false)
    private Integer semesterId;

    @Column(name = "department_id", nullable = false)
    private Long departmentId;

    // Define the many-to-many relationship with Student (mappedBy set on Student side)
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

    public Integer getSemesterId() {
        return semesterId;
    }

    public void setSemesterId(Integer semesterId) {
        this.semesterId = semesterId;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
}
