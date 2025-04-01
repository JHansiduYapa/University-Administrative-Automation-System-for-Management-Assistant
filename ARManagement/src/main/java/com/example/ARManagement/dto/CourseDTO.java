package com.example.ARManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CourseDTO {
    private Long courseId;
    private String courseName;
    private Integer credit;
    private Long semesterId;
    private Long departmentId;
    private LecturerDTO coordinator;
}
