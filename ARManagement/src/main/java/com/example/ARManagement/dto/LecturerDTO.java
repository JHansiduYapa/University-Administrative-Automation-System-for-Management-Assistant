package com.example.ARManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LecturerDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String departmentName;
    private boolean adviserLec;
}