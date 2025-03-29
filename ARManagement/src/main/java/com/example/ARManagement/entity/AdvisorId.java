package com.example.ARManagement.entity;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
public class AdvisorId implements Serializable {
    private Long lecturerId;
    private Long studentId;
}
