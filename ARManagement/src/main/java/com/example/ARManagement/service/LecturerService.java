package com.example.ARManagement.service;

import com.example.ARManagement.dto.LecturerDTO;
import com.example.ARManagement.entity.Lecturer;
import com.example.ARManagement.repository.LecturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LecturerService {

    @Autowired
    private LecturerRepository lecturerRepository;

    public List<LecturerDTO> getAllLecturers() {
        List<Lecturer> lecturers = lecturerRepository.findAll();
        return lecturers.stream().map(lecturer -> new LecturerDTO(
                lecturer.getLecturerId(),
                lecturer.getFirstName(),
                lecturer.getLastName(),
                lecturer.getEmail(),
                lecturer.getDepartment().getDepartmentName(), // assuming getDepartmentName() exists
                lecturer.isAdviserLec()
        )).collect(Collectors.toList());
    }
    public LecturerDTO setAdviser(boolean adviserLec,Long id){
        Lecturer lecturer=lecturerRepository.findById(id).get();
        lecturer.setAdviserLec(adviserLec);
        return new LecturerDTO(
                lecturer.getLecturerId(),
                lecturer.getFirstName(),
                lecturer.getLastName(),
                lecturer.getEmail(),
                lecturer.getDepartment().getDepartmentName(), // assuming getDepartmentName() exists
                lecturer.isAdviserLec()
        );
    }
}
