package com.example.ARManagement.controller;

import com.example.ARManagement.dto.CourseDetailsDTO;
import com.example.ARManagement.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Get course details including available lecturers based on the course's department
    @GetMapping("/{courseId}/details")
    public CourseDetailsDTO getCourseDetails(@PathVariable Long courseId) {
        return courseService.getCourseDetails(courseId);
    }

    // Update the coordinator for a course by its id
    @PutMapping("/{courseId}/coordinator")
    public void updateCoordinator(@PathVariable Long courseId, @RequestParam Long coordinatorId) {
        courseService.updateCourseCoordinator(courseId, coordinatorId);
    }
}
