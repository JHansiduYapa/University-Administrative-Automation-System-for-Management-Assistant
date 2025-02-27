package com.example.ARManagement.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

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

    @Column(name = "semester", nullable = false)
    private Integer semester;

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

    @Column(name = "department_id", nullable = false)
    private Long departmentId;

    @Column(name = "address", nullable = false)
    private String address;

    // make a join table that student_course
    // there is ManyToMany relationship that get by the
    @ManyToMany
    @JoinTable(
            name = "student_course",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses;

    // Fetch roles eagerly for authentication
    /**
     * It is common practice to prefix role names with "ROLE_" (e.g., "ROLE_STUDENT", "ROLE_ADMIN")
     * so that Spring Security can automatically recognize them when using expressions like hasRole("STUDENT").
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "student_roles",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    // Default constructor
    public Student() {
    }

    // Parameterized constructor
    public Student(String studentId, String firstName, String middleName, String lastName, Integer semester,
                   LocalDate dateOfBirth, String gender, String email, Double gpa, LocalDate registrationDate,
                   Long departmentId, String address) {
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
        this.departmentId = departmentId;
        this.address = address;
    }

    // Getters and Setters

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

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
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

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }
}
