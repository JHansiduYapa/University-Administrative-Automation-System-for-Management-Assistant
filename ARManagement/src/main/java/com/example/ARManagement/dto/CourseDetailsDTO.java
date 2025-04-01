package com.example.ARManagement.dto;

import java.util.List;

public class CourseDetailsDTO {
    private CourseDTO course;
    private List<LecturerDTO> availableLecturers;

    // Constructors, getters, and setters

    public CourseDetailsDTO() {}

    public CourseDetailsDTO(CourseDTO course, List<LecturerDTO> availableLecturers) {
        this.course = course;
        this.availableLecturers = availableLecturers;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public List<LecturerDTO> getAvailableLecturers() {
        return availableLecturers;
    }

    public void setAvailableLecturers(List<LecturerDTO> availableLecturers) {
        this.availableLecturers = availableLecturers;
    }
}
