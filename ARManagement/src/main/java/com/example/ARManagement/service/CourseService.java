package com.example.ARManagement.service;

import com.example.ARManagement.dto.CourseDTO;
import com.example.ARManagement.dto.CourseDetailsDTO;
import com.example.ARManagement.dto.LecturerDTO;
import com.example.ARManagement.entity.Course;
import com.example.ARManagement.entity.Lecturer;
import com.example.ARManagement.repository.CourseRepository;
import com.example.ARManagement.repository.LecturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService{

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LecturerRepository lecturerRepository;


    public CourseDetailsDTO getCourseDetails(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Map Course to CourseDTO including the coordinator as LecturerDTO
        CourseDTO courseDTO = new CourseDTO(
                course.getCourseId(),
                course.getCourseName(),
                course.getCredit(),
                course.getSemester().getSemesterId(),  // Ensure getSemesterId() exists
                course.getDepartment().getDepartmentId(), // Ensure getDepartmentId() exists
                course.getCoordinator() != null
                        ? new LecturerDTO(
                        course.getCoordinator().getLecturerId(),
                        course.getCoordinator().getFirstName(),
                        course.getCoordinator().getLastName(),
                        course.getCoordinator().getEmail(),
                        course.getCoordinator().getDepartment().getDepartmentName()
                )
                        : null
        );

        // Find all lecturers in the same department as the course and map them to LecturerDTO
        List<LecturerDTO> availableLecturers = lecturerRepository
                .findByDepartmentDepartmentId(course.getDepartment().getDepartmentId())
                .stream()
                .map(lecturer -> new LecturerDTO(
                        lecturer.getLecturerId(),
                        lecturer.getFirstName(),
                        lecturer.getLastName(),
                        lecturer.getEmail(),
                        lecturer.getDepartment().getDepartmentName()
                ))
                .collect(Collectors.toList());

        return new CourseDetailsDTO(courseDTO, availableLecturers);
    }

    public void updateCourseCoordinator(Long courseId, Long coordinatorId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        Lecturer lecturer = lecturerRepository.findById(coordinatorId)
                .orElseThrow(() -> new RuntimeException("Lecturer not found"));
        course.setCoordinator(lecturer);
        courseRepository.save(course);
    }
}
