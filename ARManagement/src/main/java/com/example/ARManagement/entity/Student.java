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

//    @ManyToOne
//    @JoinColumn(name = "semester_id", nullable = false)
//    private Semester semester;

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
        //this.semester = semester;
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

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getGpa() {
        return gpa;
    }

    public void setGpa(Double gpa) {
        this.gpa = gpa;
    }

    public LocalDate getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Batch getProperBatch() {
        return properBatch;
    }

    public void setProperBatch(Batch properBatch) {
        this.properBatch = properBatch;
    }

    public Batch getAcademicBatch() {
        return academicBatch;
    }

    public void setAcademicBatch(Batch academicBatch) {
        this.academicBatch = academicBatch;
    }
}
