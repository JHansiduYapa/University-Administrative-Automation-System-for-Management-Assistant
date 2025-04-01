package com.example.ARManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@Data
@AllArgsConstructor
public class StudentDTO {
    private Long studentId;
    private String firstName;
    private String middleName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String gender;
    private String email;
    private LocalDate registrationDate;
    private Long departmentId;        // maps to Department entity
    private String address;
    private Long batchId;             // maps to properBatch (Batch entity)
}
