package com.example.ARManagement.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;

    // e.g. "ROLE_STUDENT", "ROLE_ADMIN"
    @Column(name = "role_name", nullable = false, unique = true)
    private String roleName;

    // Optional: if we want a bidirectional mapping to Student
    @ManyToMany(mappedBy = "roles")
    private Set<Student> students = new HashSet<>();

    // Constructors
    public Role() { }

    public Role(String roleName) {
        this.roleName = roleName;
    }

    // Getters and setters
    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
}
