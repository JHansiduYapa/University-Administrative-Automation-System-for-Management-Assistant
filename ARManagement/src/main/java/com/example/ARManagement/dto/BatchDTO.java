package com.example.ARManagement.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class BatchDTO {
    private Long batchId;
    private String batchName;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate regDate;
    private Integer studentCount;
}