package com.example.ARManagement.dto;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StudentDetailsDTO {
    private Long studentId;
    private String firstName;
    private String lastName;
    private String email;
    private String departmentName;
    private Integer semesterName;

    public StudentDetailsDTO() {}

}
