package com.example.ARManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LecturerDTO {
    private Long lecturerId;
    private String firstName;
    private String lastName;
    private String email;
    private String departmentName;
    private boolean adviserLec;
}
