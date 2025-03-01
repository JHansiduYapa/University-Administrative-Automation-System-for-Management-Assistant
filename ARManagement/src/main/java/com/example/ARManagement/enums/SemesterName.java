package com.example.ARManagement.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum SemesterName {
    semester1,
    semester2,
    semester3,
    semester4,
    semester5,
    semester6,
    semester7,
    semester8;

    @JsonCreator
    public static SemesterName fromString(String value) {
        return SemesterName.valueOf(value.toLowerCase());
    }
}
