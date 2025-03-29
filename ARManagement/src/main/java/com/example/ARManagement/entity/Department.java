package com.example.ARManagement.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "department")
public class Department {

    @Id
    @Column(name = "department_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long departmentId;

    @Column(name = "department_name", nullable = false)
    private String departmentName;

    @Column(name = "hod", nullable = false)
    private String hod;

    // The mappedBy attribute tells Hibernate that this side of the relationship is not the owner of the foreign key.
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true)
    // jsonManagedReference will parent side (the one that “owns” the collection) with @JsonManagedReference
    @JsonManagedReference // This side will be serialized normally
    private List<Lecturer> lecturers;


}
