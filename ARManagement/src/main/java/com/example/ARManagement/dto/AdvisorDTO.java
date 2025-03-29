package com.example.ARManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AdvisorDTO {
    private Long lecturerId;
    private String lecturerName; // e.g. "FirstName LastName"
    private String departmentName;
    private String email;
}
