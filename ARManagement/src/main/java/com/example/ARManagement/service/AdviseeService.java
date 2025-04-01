package com.example.ARManagement.service;

import com.example.ARManagement.dto.AdvisorStudentDTO;
import com.example.ARManagement.entity.Lecturer;
import com.example.ARManagement.entity.Student;
import com.example.ARManagement.repository.LecturerRepository;
import com.example.ARManagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdviseeService {
    @Autowired
    LecturerRepository lecturerRepository;

    @Autowired
    StudentRepository studentRepository;

    public List<AdvisorStudentDTO> getAdvisees(Long batch, Long department) {
        List<Student> students;

        if (department == null) {
            students = studentRepository.findByBatch(batch);
        } else {
            students = studentRepository.findByDepartmentAndBatch(department, batch);
        }

        return students.stream().map(student -> new AdvisorStudentDTO(
                student.getStudentId(),
                student.getFirstName() + " " + student.getLastName(),
                (student.getAdviser() != null)
                        ? student.getAdviser().getFirstName() + " " + student.getAdviser().getLastName()
                        : "No Adviser"
        )).collect(Collectors.toList());
    }

    public void distributeStudents(Long batchId, Long departmentId) {
        List<Student> students;
        List<Lecturer> lecturerList;

        if (departmentId == null) {
            students = studentRepository.findByBatch(batchId);
            lecturerList = lecturerRepository.findAdviserLecturersByDepartment(null); // Get all lecturers
        } else {
            students = studentRepository.findByDepartmentAndBatch(departmentId, batchId);
            lecturerList = lecturerRepository.findAdviserLecturersByDepartment(departmentId);
        }

        // Check if no lecturers are available
        if (lecturerList == null || lecturerList.isEmpty()) {
            throw new RuntimeException("No adviser lecturers found for the given department.");
        }

        int studentsPerLecturer = students.size() / lecturerList.size();
        int remainder = students.size() % lecturerList.size(); // Handle leftover students
        int j = 0, k = 0;

        for (Student student : students) {
            Lecturer lecturer = lecturerList.get(k);
            student.setAdviser(lecturer);
            j++;

            // Move to next lecturer after assigning `studentsPerLecturer` students
            if (j >= studentsPerLecturer + (k < remainder ? 1 : 0)) { // Distribute remainder students evenly
                k++;
                j = 0;
            }

            // Prevent index out of bounds
            if (k >= lecturerList.size()) {
                k = 0;
            }
        }

        // Save updated students
        studentRepository.saveAll(students);
    }


}
