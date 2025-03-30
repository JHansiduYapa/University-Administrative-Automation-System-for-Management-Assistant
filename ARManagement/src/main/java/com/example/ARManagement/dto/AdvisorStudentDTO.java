package com.example.ARManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AdvisorStudentDTO {
    private Long studentId;
    private String studentName;
    private String lecturerName;
}
