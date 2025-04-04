package com.example.ARManagement.StudentRegistrationControllerTest;

import com.example.ARManagement.controller.StudentRegistrationController;
import com.example.ARManagement.entity.Student;
import com.example.ARManagement.service.StudentRegistrationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class StudentRegistrationControllerTest {

    private MockMvc mockMvc;

    @Mock
    private StudentRegistrationService registrationService;

    @InjectMocks
    private StudentRegistrationController registrationController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(registrationController).build();
    }

    @Test
    public void testRegisterStudent() throws Exception {
        // Prepare mock student data
        Student mockStudent = new Student();
        // Set properties for mockStudent using the actual setter methods available in your Student class

        // Mock service behavior
        when(registrationService.registerStudent(any(Student.class))).thenReturn(mockStudent);

        // Perform POST request and verify response
        String studentJson = "{}"; // Replace with actual JSON structure matching your Student entity

        mockMvc.perform(post("/api/students/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(studentJson))
                .andExpect(status().isOk());

        // Verify service method was called once with correct parameters
        verify(registrationService, times(1)).registerStudent(any(Student.class));
    }
}
